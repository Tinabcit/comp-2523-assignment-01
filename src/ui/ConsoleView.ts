import { EOL } from "node:os";
import { table, type TableUserConfig } from "table";
import Reminder from "../core/Reminder.js";
import { type RemindersGroupedByTag } from "../core/ReminderRepository.js";

export default class ConsoleView {
  private readonly menuTable: string;

  constructor() {
    const menuData = [
      ["1", "Show all reminders 👀"],
      ["2", "Search reminders 🔎"],
      ["3", "Add reminder ➕"],
      ["4", "Modify reminders 📝"],
      ["5", "Toggle completion ✅"],
      ["6", "Exit 👋"],
    ];

    const config: TableUserConfig = {
      header: {
        alignment: "center",
        content: "Reminders Menu",
      },
    };

    this.menuTable = table(menuData, config);
  }

  public showMenu(): void {
    console.log(this.menuTable);
  }

  public showMessage(message: string): void {
    console.log(message);
  }

  public showNoRemindersWarning(): void {
    console.log(`${EOL}  😇 You have no reminders`);
  }

  public showReminderAdded(): void {
    console.log(`${EOL}  🏁  Reminder Added`);
  }

  public showReminderModified(): void {
    console.log(`${EOL}  🏁   Reminder Modified`);
  }

  public showCompletionToggled(): void {
    console.log(`${EOL}  🏁   Reminder Completion Toggled`);
  }

  public showExitMessage(): void {
    console.log(`${EOL}  ❌  Exited application${EOL}`);
  }

  public showRetryMessage(): void {
    console.log(`${EOL}  🔄  Please try typing it again`);
  }

  public showReminders(reminders: Reminder[]): void {
    console.log(EOL);
    reminders.forEach((reminder, index) => {
      console.log(` [${index + 1}] ${reminder.description}`);
    });
  }

  public showGroupedReminders(groupings: RemindersGroupedByTag): void {
    Object.keys(groupings).forEach((tag) => {
      this.showTag(tag);
      groupings[tag]?.forEach((reminder: Reminder) => {
        this.showReminderWithStatus(reminder);
      });
    });
  }

  /**
   * Shows search results
   */
  public showSearchResults(reminders: Reminder[]): void {
    if (reminders.length === 0) {
      console.log(`${EOL}No results found for search.${EOL}`);
    } else {
      console.log("");
      reminders.forEach((reminder) => {
        this.showReminderWithStatus(reminder);
      });
    }
  }

  private showTag(tag: string): void {
    console.log(`${EOL}🏷️  ${tag.toUpperCase()}`);
  }

  private showReminderWithStatus(reminder: Reminder): void {
    const icon = reminder.isCompleted ? "🟢" : "⭕️";
    console.log(`  ${icon} ${reminder.description}`);
  }
}
