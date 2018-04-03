# apporganizer

#Task
Your task is to create a small application capable of receiving appointment entries and managing them. The application has to be based on the Spring (Boot) Framework in the current version 2.0. You do not have to use the built-in user management. Indeed this task does not require you to password protect the application at all.  

#Description
When the user opens the page they see all appointments the application knows. The user then can edit, delete, cancel or confirm an appointment. Confirmation of an appointment means that it did take place. The user can enter some note about the result of that appointment into a text field and then that note is saved to the appointment. That note must be able to be viewed by the user later on.

The appointment itself consists of a date, a time and some contact information about the company where that appointment is going to take place. That company has a name, a street, a house number, a postal code, a locality,  a web URL and a contact person with a telephone number, an email address, a salutation, a first name and a last name.

#Backend
Exposes JSON REST API.
Allow download whole data as CSV.

#Frontend
Use JS framework for implementing frontend. Use routing for displaying two pages: 
list of appointments;
edit details.

#List of appointments
Shows list of appointments with action buttons (edit, delete, cancel, confirm). Edit opens “Edit details” page. Also place here action to download CSV file.

#Edit details
Show details about appointment and allow change them and save to server.
