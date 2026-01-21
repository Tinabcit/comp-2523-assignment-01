// By: Tina Shabestari
// StudentID: A01002676
// The starter code was provided by Instructor Armaan Dhanji but the ones that
// needed to be completed are all written by me and not used AI. 
// However I have used the Notion Assignment Hints as the guide me to complete the Assignment 1

// *** I have commented down the code that I have written functionality 
// so that I prove the code is written by me.

import Reminder from "./Reminder.js";

export type RemindersGroupedByTag = {
  [tag: string]: Reminder[];
};

/**
 * Considerations from Armaan:
 * Manages the collection of reminders (Repository pattern)
 * Separates data management from business logic
 */
export default class ReminderRepository {
  private reminders: Reminder[] = [];

  public getAll(): Reminder[] {
    return this.reminders;
  }

  public count(): number {
    return this.reminders.length;
  }

  public isEmpty(): boolean {
    return this.reminders.length === 0;
  }

  public add(description: string, tag: string): void {
    // This method does not return anything (void).
    // Its job is to create a new Reminder and store it in the repository.

    // Create a new Reminder object using the description and tag provided by the user,
    // then push it into the reminders array (adds it to the end of the list).
    this.reminders.push(new Reminder(description, tag));

  }

  public getByIndex(index: number): Reminder {
    // This method returns ONE Reminder from the array based on its index.
    // First, check if the index is valid (in range and repository not empty).
    if (!this.isValidIndex(index)) {
      // If the index is not valid, stop and throw an error so the caller knows.
      throw new Error("Invalid index");
    }
    // Return the reminder at that index.
    // The "!" tells TypeScript: "this will NOT be undefined here"
    // because we already validated the index above.
    return this.reminders[index]!;
  }
  public isValidIndex(index: number): boolean {
    // This method checks whether an index can safely be used on the reminders array.
    // If the repository has no reminders, any index is invalid.
    if (this.isEmpty()) return false;
    // If the index is less than O OR greater/equal to the number of reminders,
    // it is outside the valid range of the array.
    if (index < 0 || index >= this.count()) return false;
    // If it passed both checks, the index is valid
    return true;
  }

  public modify(index: number, description: string): void {
    // This method updates the description of an existing reminder.
    // If the index is invalid, do nothing and exit early.
    // (Lab instructions usually want early return instead of throwing here.)
    if (!this.isValidIndex(index)){
      return;
    }
    // Get the reminder at the index (the "!" is safe because we validated).
    // Then call setDescription to update it (and trigger Reminder validation rules).
    this.reminders[index]!.setDescription(description);
  }

  public toggleCompletion(index: number): void {
    // This method flips the completion status of one reminder
    // If the index is invalid, do nothing and exit early.
    if (!this.isValidIndex(index)){
      return;
    }
    // Get the reminder at the given index and toggle its completion status.
    // Again, "!" is safe because we validated.
    this.reminders[index]!.toggleCompletion();
    
  }

  public search(keyword: string): Reminder[] {
    // This method performs a two-step search:
    // 1) Try searching by tag first
    // 2) If no tag matches, then search by description

    // Search for exact tag matches first.
    const tagResult = this.searchByTag(keyword);

    // If we found at least one reminder with a matching tag, return those results.
    if(tagResult.length > 0) {
      return tagResult;
    }
    // Otherwise, return results from searching descriptions instead.
    return this.searchByDescription(keyword);
  }

  public groupByTag(): RemindersGroupedByTag {
    // This method groups reminders into an object where:
    // key = tag, value = array of reminders with that tag.

    // Start with an empty object.
    const groupings: RemindersGroupedByTag = {};
    // Provide your logic here
    
    // Loop through every reminder in the repository.
    for(let i = 0; i < this.reminders.length; i++) {
      // Get the reminder at position i.
      // "!" is used because TypeScript might think array access could be undefined.
      const reminderValue = this.reminders[i]!;

      // Read the tag of the reminder (this will be used as the group key).
      const tag = reminderValue.tag;
      
      // If this tag has not been seen before, create a new array for it.
      if (groupings[tag] === undefined) {
        groupings[tag] = [];
      }
      // Add the reminder into the correct tag group.
      groupings[tag].push(reminderValue);
    }
    // Return the final grouped object.
    return groupings;
  }

  private searchByTag(keyword: string): Reminder[] {
    // This is a helper method that searches reminders by tag.
    // It returns an array of matching reminders (could be empty).

    // Create an empty array to store matches.
    const results: Reminder[] = [];

    // Loop through all reminders.
    for (let i = 0; i < this.reminders.length; i++) {
      // Get the reminder at index 'i'.
       const reminderValue = this.reminders[i]!;
      
      // If the reminder's tag exactly equals the keyword, add it to results.
      if (reminderValue.tag === keyword) {
        results.push(reminderValue);
    }
  }
  
  // Return all the tag matches (or empty array if none).
  return results;
  }

  
  private searchByDescription(keyword: string): Reminder[] {
    // This is a helper method that searches reminders by description text.
    // It returns reminders whose description contains the keyword.

    // Create an empty array to store matches.
    const results: Reminder[] = [];

    // Loop through every reminder.
    for (let i = 0; i < this.reminders.length; i++) {
      // Get the reminder at index 'i'
      const reminderValue = this.reminders[i]!;
    
    // Check if the description contains the keyword (partial match).
    // If yes, add it to the results list.
    if (reminderValue.description.includes(keyword)) {
      results.push(reminderValue);
    }
  }
  // Return all description matches (or empty array if none).
  return results;
  }
}
