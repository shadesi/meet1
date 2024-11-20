Feature: Specify Number of Events

  Scenario: User selects to view a specific number of events
    Given the user is on the events page
    When the user specifies the number of events to display
    Then the correct number of events should be displayed
