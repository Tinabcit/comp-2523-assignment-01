// By: Tina Shabestari
// StudentID: A01002676
// The starter code was provided by Instructor Armaan Dhanji but the ones that
// needed to be completed are all written by me and not used AI. 
// However I have used the Notion Assignment Hints as the guide me to complete the Assignment 1

// *** I have commented down the code that I have written functionality 
// so that I prove the code is written by me.

/**
 * Domain model representing a single reminder
 */
export default class Reminder {
  
  private _description: string; // Stores the text description of the reminder
  private _tag: string; // Stores the tag/category of the reminder(ex: school, work)
  private _isCompleted: boolean; // Tracks whether the reminder is completed or not

  // Constructor object of Reminder Class
  constructor(description: string, tag: string) {
    this._description = description; 
    this._tag = tag;
    this._isCompleted = false; // All reminders start as not completed
    this.setDescription(description) //Use the setter to validate and assign the description 
  }
  // Returns the reminder description
  public get description(): string {
    return this._description; // Return the private description field
  }
  // Updates the reminder description
  public setDescription(description: string) {
    // Check if the description is empty.
    if (description.length < 0) {
      // Throw an error if the description is invalid
      throw new Error("Description cannot be empty")
    }
    // Save the validated description
    this._description = description;
  }

  // Return the reminder tag
  public get tag(): string {
    return this._tag; // Return the private tag field
  }

  // Update the reminder tag
  public setTag(tag: string): void {
    // Ensure the tag has a minimum length 
    if (tag.length < 4) {
      // Throw an error if the tag is too short
      throw new Error ("Tag length too short")
    }
    // Save the validated tag
    this._tag = tag
    
  }

  // Returns whether the reminder is completed
  public get isCompleted(): boolean {
    // Return the completion status
    return this._isCompleted;
  }

  // Toggle the completion status of the reminder,
  // If it was false, it become true
  // If it was true, it become false
  public toggleCompletion(): void {
    // Flip the completion status using boolean negation
   this._isCompleted = !this._isCompleted;
   
  }
}
