# Cars-Gallery

A web app where users can showcase and share details about cars. It was created for an Exam in an online course.
The current code wasn't wrote for the purpose of being used as online site. It is an exam and excersice

## Installation

1. Clone the repo:  
   `git clone https://github.com/YoanDemerdzhiev/Cars-Gallery.git`

2. Install dependencies:  
   `npm install`

3. Run the app:  
   `npm run start`

## Usage

- Visit `http://localhost:3000` in your browser.
- Register or log in to add, edit, and like cars.
- Browse car details on the main page.

## API Endpoints

- `GET /all-posts` - List all cars (for guests and users)  
- `POST /cars/create` - Add a new car  (for users)
- `POST /cars/edit/{id of the car}` - Edit a car (for the user who has created the post) 
- `POST /cars/delete/{id of the car}` - Delete a car (for the user who has created the post)

## Contributing

Feel free to submit pull requests or open issues!

## License

MIT License

