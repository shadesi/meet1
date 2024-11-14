Feature: Show/Hide Event Details

  Scenario: User clicks on an event to view details
    Given the user is on the events page
    When the user clicks on an event
    Then the event details should be visible

  Scenario: User clicks on the event again to hide details
    Given the user has clicked on an event
    When the user clicks on the event again
    Then the event details should be hidden
