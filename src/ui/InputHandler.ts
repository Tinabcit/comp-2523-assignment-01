import readlineSync from "readline-sync";
import { EOL } from "node:os";
import ReminderRepository from "../core/ReminderRepository.js";
import ConsoleView from "./ConsoleView.js";

/**
 * Handles all user input validation and prompting
 * Separates input handling from business logic
 */
export default class InputHandler {
  constructor(
    private repository: ReminderRepository,
    private view: ConsoleView
  ) {}

  /**
   * Prompts user and waits for Enter to show menu, then returns selected item
   */
  public getMenuSelection(): string {
    readlineSync.question(`${EOL}Hit [Enter] key to see main menu: `, {
      hideEchoBack: true,
      mask: "",
    });
    this.view.showMenu();
    return this.getMenuItem();
  }

  /**
   * Gets and validates menu item selection (1-6)
   */
  public getMenuItem(): string {
    return readlineSync.question("Choose a [Number] followed by [Enter]: ", {
      limit: ["1", "2", "3", "4", "5", "6"],
      limitMessage: `${EOL}  🚨  Sorry, input is not a valid menu item.${EOL}`,
    });
  }

  /**
   * Gets user input with validation and confirmation
   */
  public getUserInput(prompt: string, requiresValidIndex = false): string {
    let userInput: string;

    for (;;) {
      userInput = readlineSync.question(`${EOL}Enter a ${prompt} here: `, {
        limit: (input: string) => {
          return this.validateInput(input, requiresValidIndex);
        },
        limitMessage: "",
      });

      const confirmed = this.confirmInput(prompt, userInput);
      if (confirmed) break;

      this.view.showRetryMessage();
    }

    return userInput;
  }

  /**
   * Asks user to confirm their input
   */
  public confirmInput(prompt: string, input: string): boolean {
    const answer = readlineSync.question(
      `You entered ${prompt}: '${input}', is it correct? y/n: `,
      {
        limit: /^[YNyn]{1}$/,
        limitMessage: `${EOL}  🚨  Invalid input: Please enter either y/n.${EOL}`,
      }
    );
    return answer.toLowerCase() === "y";
  }

  /**
   * Asks if user wants to toggle completion status
   */
  public askToToggleCompletion(): boolean {
    const answer = readlineSync.question(
      `${EOL}Do you wish to toggle the completed status? y/n: `,
      {
        limit: /^[YNyn]{1}$/,
        limitMessage: `${EOL}  🚨  Invalid input: Please enter either y/n.${EOL}`,
      }
    );
    return answer.toLowerCase() === "y";
  }

  /**
   * Validates user input based on context
   */
  private validateInput(input: string, requiresValidIndex: boolean): boolean {
    // Check for empty input
    if (!input) {
      this.view.showMessage(
        `${EOL}  🚨  Input cannot be blank: Please try again.${EOL}`
      );
      return false;
    }

    // If an index is required, validate it's a number in range
    if (requiresValidIndex) {
      if (!/^\d+$/.test(input)) {
        this.view.showMessage(
          `${EOL}  🚨  Input must be positive number from the list of reminders: Please try again.${EOL}`
        );
        return false;
      }

      const index = Number(input) - 1;
      if (!this.repository.isValidIndex(index)) {
        this.view.showMessage(
          `${EOL}  🚨  Input must be number from the list of reminders: Please try again.${EOL}`
        );
        return false;
      }
    }

    return true;
  }
}
