# Temperature Converter Program
# This program converts between Celsius and Fahrenheit

# Global list to store conversion history
history = []

# Function to convert Celsius to Fahrenheit
def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

# Function to convert Fahrenheit to Celsius
def fahrenheit_to_celsius(fahrenheit):
    celsius = (fahrenheit - 32) * 5/9
    return celsius

# Function to display the conversion history
def show_history():
    if len(history) == 0:
        print("No conversion history available.")
    else:
        print("\n===== Conversion History =====")
        for i in range(len(history)):
            print(f"{i+1}. {history[i]}")
        print("=============================\n")

# Main function
def main():
    while True:
        print("\n===== Temperature Converter =====")
        print("1. Convert Celsius to Fahrenheit")
        print("2. Convert Fahrenheit to Celsius")
        print("3. View History")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ")
        
        if choice == '1':
            try:
                celsius = float(input("Enter temperature in Celsius: "))
                result = celsius_to_fahrenheit(celsius)
                print(f"{celsius}°C = {result:.1f}°F")
                
                # Add to history
                history.append(f"{celsius}°C = {result:.1f}°F")
            except ValueError:
                print("Please enter a valid number.")
        
        elif choice == '2':
            try:
                fahrenheit = float(input("Enter temperature in Fahrenheit: "))
                result = fahrenheit_to_celsius(fahrenheit)
                print(f"{fahrenheit}°F = {result:.1f}°C")
                
                # Add to history
                history.append(f"{fahrenheit}°F = {result:.1f}°C")
            except ValueError:
                print("Please enter a valid number.")
        
        elif choice == '3':
            show_history()
        
        elif choice == '4':
            print("Thank you for using the Temperature Converter. Goodbye!")
            break
        
        else:
            print("Invalid choice. Please try again.")

# Run the program
if __name__ == "__main__":
    main()