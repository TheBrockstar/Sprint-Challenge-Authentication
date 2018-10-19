<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
     - Sessions are use to persist data across requests. It basically allows a web application to become uniquely stateful for each user.

2. What does bcrypt do to help us store passwords in a secure manner.
    - To help us store password in a secure manner, bcrypt hashes passwords and validates hashed passwords.

3. What does bcrypt do to slow down attackers?
    - In order to slow down attackers, bcrypt hashes with a random (or defined) salt string, and hashes a variable, server defined, number of rounds.

4. What are the three parts of the JSON Web Token?
    - The three parts of the JSON web token are: 1. the header, 2. the payload, and 3. the signature.
