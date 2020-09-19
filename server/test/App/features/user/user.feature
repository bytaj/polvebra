Feature: User CRUD
  I want to check the api working for creating
  and login users.

  Scenario: Create an User
    Given I send a PUT request to "/register" with body:
    """
      {
        "username": "testName",
        "name": "test name",
        "email": "tes@test.com",
        "passwordA": "passwordTest",
        "passwordB": "passwordTest"
      }
    """
    Then the response status code should be 201
    Then the response content should be:
    """
    {
      "username": "testName",
      "name": "test name",
      "email": "tes@test.com",
      "balance": 0,
      "netBalance": 0
    }
    """
  Scenario: Login a user
    Given a user "user1" registered in the application
    When I log the user with username "user1" and password "testPassword"
    And I send a GET request to "/me"
    Then the response status code should be 200