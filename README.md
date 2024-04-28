
Budget Planner with Supabase
This is a budget planner application built using React, integrated with Supabase for data storage and authentication. It provides users with tools to manage their finances, track expenses, and visualize their budget using pie charts.

Features
Expense Tracking: Users can record their expenses and categorize them by type (e.g., groceries, rent, entertainment).
Budget Management: Users can set budgets for different expense categories and track their spending against these budgets.
Visualization: The app utilizes pie charts to visually represent the distribution of expenses across different categories.
Secure Authentication: User authentication is provided by Supabase Authentication, ensuring secure access to the application.
Data Storage: Supabase is used as the backend to store user data, ensuring data persistence and reliability.

Requirements
Node.js
React
Supabase account

Installation
Clone the repository:
git clone https://github.com/Moni282003/Budget_Planner.git

Navigate to the project directory:
cd budget_planner

Install dependencies:
npm install

Set up Supabase:
Sign up for a Supabase account and create a new project.
Obtain your Supabase URL and API key.
Paste your Supabase URL and API key in supabaseClient.js.

Run the app:
npm start

Usage
Register/Login: Users can register for an account or log in using their email and password.
Add Expenses: Once logged in, users can add expenses and categorize them by type.
Set Budgets: Users can set budgets for different expense categories to manage their spending.
View Reports: Users can view pie charts that visualize the distribution of expenses across different categories.
