// By: Tina Shabestari
// StudentID: A01002676
// The starter code was provided by Instructor Armaan Dhanji but the ones that
// needed to be completed are all written by me and not used AI. 
// However I have used the Notion Assignment Hints as the guide me to complete the Assignment 1

// *** I have commented down the code that I have written functionality 
// so that I prove the code is written by me.


import ReminderRepository from "./core/ReminderRepository.js";
import ConsoleView from "./ui/ConsoleView.js";
import InputHandler from "./ui/InputHandler.js";

export default class ReminderApp { // Controller
  private repository: ReminderRepository; // Model
  private view: ConsoleView; // View
  private input: InputHandler; // View

  // MVC Pattern Code

  constructor() {
    this.repository = new ReminderRepository();
    this.view = new ConsoleView();
    this.input = new InputHandler(this.repository, this.view);
  }
  /**
   * Starts application and continually prompts user to choose
   * from one of six menu items.
   */
  public start(): void {
    let exitFlag = false;

    for (;;) {
      const menuItem = this.input.getMenuSelection();

      switch (menuItem) {
        case "1":
          this.handleShowReminders();
          break;
        case "2":
          this.handleSearchReminders();
          break;
        case "3":
          this.handleAddReminder();
          break;
        case "4":
          this.handleModifyReminder();
          break;
        case "5":
          this.handleToggleCompletion();
          break;
        default:
          exitFlag = true;
          break;
      }

      if (exitFlag) break;
    }

    this.view.showExitMessage();
  }

  /**
   * Shows all reminders grouped by tag
   */
  private handleShowReminders(): void {
    /*
        TODO: If no reminders then -> show warning
              otherwise
              - this.view.showGroupedReminders(this.repository.groupByTag());
    */

    if (this.repository.isEmpty()) { //Check if there are no reminders in the repository
      this.view.showNoRemindersWarning(); // If empty, show warning and exit the method.
      return; // Exit the method early so no further code runs
    }
    const grouped = this.repository.groupByTag(); // Initialize the value and group reminders by tag. Call the repository method to group reminders by their tag
    this.view.showGroupedReminders(grouped); // display grouped reminders using the view


  }

  /**
   * Searches and displays matching reminders
   */
  private handleSearchReminders(): void {
    /*
        TODO: If no reminders then -> show warning
              otherwise
              - Get search keyword from user
              - Get results from repository.search(keyword)
              - Show results using view
    */
    if (this.repository.isEmpty()) { // Check if there are no reminders to search through
      this.view.showNoRemindersWarning(); // Show a warning message if the repository is empty
      return; // Exit the method early
    }
    const keyword = this.input.getUserInput("search keyword"); // Ask the user to enter a search keyword
    const results = this.repository.search(keyword); // Search the repository for the reminders matching the keyword
    this.view.showSearchResults(results); // Display the search results using the view

  }

  /**
   * Adds a new reminder
   */
  private handleAddReminder(): void {
    /*
        TODO: Get description from user
              Get tag from user
              Add to repository
              Show success message
    */
   const description = this.input.getUserInput("description"); // Ask the user to enter the reminder description
    // Study Typescript
    const tag = this.input.getUserInput("tag"); // Ask the user to enter a tag for the reminder
    this.repository.add(description, tag) // Add the new reminder to the repository
    this.view.showReminderAdded(); // Show a success message confirming the reminder was added

  }

  /**
   * Modifies an existing reminder
   */
  private handleModifyReminder(): void {
    /*
        TODO: If no reminders then -> show warning
              otherwise
              - Show all reminders
              - Get reminder index from user (requiresValidIndex = true)
              - Get new description from user
              - Modify reminder in repository
              - Ask if user wants to toggle completion
              - If yes, toggle completion
              - Show success message
    */
    if (this.repository.isEmpty()) { // Check if there are any reminders to modify
      this.view.showNoRemindersWarning(); // Show a warning if there are no reminders
      return; // Exit the message early
    }
    this.view.showReminders(this.repository.getAll()); // Display all reminders so the user can choose one to modify

    const indexStr = this.input.getUserInput("reminder number", true); // Ask the user for the reminder number (validated by InputHandler)
    const index = Number(indexStr) - 1; // Convert the user input to a zero-based array index

    const newDescription = this.input.getUserInput("new description"); // Ask the user for the new description
    this.repository.modify(index, newDescription) // Update the reminder description in the repository
    if (this.input.askToToggleCompletion()) { // Ask the user if they want to toggle the completion status
     this.repository.toggleCompletion(index); // If yes, toggle the reminder’s completion status
    }
    this.view.showReminderModified() // Show a success message indicating the reminder was modified

  }

  /**
   * Toggles completion status of a reminder
   */
  private handleToggleCompletion(): void {
    /*
        TODO: If no reminders then -> show warning
              otherwise
              - Show all reminders
              - Get reminder index from user (requiresValidIndex = true)
              - Toggle completion in repository
              - Show success message
    */

    if (this.repository.isEmpty()) { // Check if there are reminders available to toggle
      this.view.showNoRemindersWarning(); // Show a warning message if there are none
      return; // Exit the message early
    }
    this.view.showReminders(this.repository.getAll());  // Display all reminders so the user can choose one
    const indexStr = this.input.getUserInput("reminder number", true); // Ask the user for the reminder number (validated)
    const index = Number(indexStr) - 1; // Convert the input to a zero-based index

    this.repository.toggleCompletion(index); // Toggle the completion status of the selected reminder
    this.view.showCompletionToggled(); // Show a confirmation message
  }
}
