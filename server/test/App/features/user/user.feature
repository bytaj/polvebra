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
        "passwordA": "passwordTest",
        "passwordB": "passwordTest"
    }
    """
