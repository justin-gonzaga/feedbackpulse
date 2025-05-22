"""
Temperature Converter Application
--------------------------------
This program allows users to convert temperatures between Celsius and Fahrenheit,
and keeps track of conversion history.

Author: CS1 Student
Date: March 2023
"""

class TemperatureConverter:
    def __init__(self):
        """Initialize the temperature converter with an empty history."""
        self.history = []
    
    def celsius_to_fahrenheit(self, celsius):
        """
        Convert temperature from Celsius to Fahrenheit.
        
        Args:
            celsius (float): Temperature in Celsius
            
        Returns:
            float: Temperature in Fahrenheit
        """
        return (celsius * 9/5) + 32
    
    def fahrenheit_to_celsius(self, fahrenheit):
        """
        Convert temperature from Fahrenheit to Celsius.
        
        Args:
            fahrenheit (float): Temperature in Fahrenheit
            
        Returns:
            float: Temperature in Celsius
        """
        return (fahrenheit - 32) * 5/9
    
    def add_to_history(self, entry):
        """Add a conversion to history."""
        self.history.append(entry)
    
    def show_history(self):
        """Display the conversion history."""
        if not self.history:
            print("\nNo conversion history available.")
            return
            
        print("\n===== Conversion History =====")
        for i, conversion in enumerate(self.history, 1):
            print(f"{i}. {conversion}")
        print("=============================")
    
    def get_temperature_input(self, unit):
        """
        Get temperature input from user with validation.
        
        Args:
            unit (str): The unit of temperature (Celsius or Fahrenheit)
            
        Returns:
            float or None: The temperature value or None if invalid
        """
        try:
            value = float(input(f"Enter temperature in {unit}: "))
            return value
        except ValueError:
            print("Error: Please enter a valid number.")
            return None
    
    def run(self):
        """Run the main program loop."""
        print("\nWelcome to the Temperature Converter!")
        
        while True:
            print("\n===== Temperature Converter =====")
            print("1. Convert Celsius to Fahrenheit")
            print("2. Convert Fahrenheit to Celsius")
            print("3. View Conversion History")
            print("4. Exit Program")
            
            choice = input("\nEnter your choice (1-4): ")
            
            if choice == '1':
                celsius = self.get_temperature_input("Celsius")
                if celsius is not None:
                    fahrenheit = self.celsius_to_fahrenheit(celsius)
                    result = f"{celsius:.2f}°C = {fahrenheit:.2f}°F"
                    print(result)
                    self.add_to_history(result)
            
            elif choice == '2':
                fahrenheit = self.get_temperature_input("Fahrenheit")
                if fahrenheit is not None:
                    celsius = self.fahrenheit_to_celsius(fahrenheit)
                    result = f"{fahrenheit:.2f}°F = {celsius:.2f}°C"
                    print(result)
                    self.add_to_history(result)
            
            elif choice == '3':
                self.show_history()
            
            elif choice == '4':
                print("Thank you for using the Temperature Converter. Goodbye!")
                break
            
            else:
                print("Invalid choice. Please enter a number between 1 and 4.")

if __name__ == "__main__":
    converter = TemperatureConverter()
    converter.run()