/*
Temperature Converter Application
--------------------------------
This program allows users to convert temperatures between 
Celsius and Fahrenheit, and keeps track of conversion history.

Author: CS1 Student
Date: March 2023
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_HISTORY 100
#define MAX_STRING_LENGTH 150

typedef struct {
    char history[MAX_HISTORY][MAX_STRING_LENGTH];
    int history_count;
} TemperatureConverter;

// Initialize the temperature converter with an empty history
void init_converter(TemperatureConverter* converter) {
    converter->history_count = 0;
    memset(converter->history, 0, sizeof(converter->history));
}

// Convert temperature from Celsius to Fahrenheit
double celsius_to_fahrenheit(double celsius) {
    return (celsius * 9/5) + 32;
}

// Convert temperature from Fahrenheit to Celsius
double fahrenheit_to_celsius(double fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

// Add a conversion to history
void add_to_history(TemperatureConverter* converter, char* entry) {
    if (converter->history_count < MAX_HISTORY) {
        strcpy(converter->history[converter->history_count], entry);
        converter->history_count++;
    }
}

// Display the conversion history
void show_history(TemperatureConverter* converter) {
    if (converter->history_count = 0) {
        printf("\nNo conversion history available.\n");
        return;
    }
    
    printf("\n===== Conversion History =====\n");
    for (int i = 1; i <= converter->history_count; i++) {
        printf("%d. %s\n", i, converter->history[i]);
    }
    printf("=============================\n");
}

// Get temperature input from user with validation
double get_temperature_input(char* unit) {
    char input[50];
    double value;
    char* endptr;
    
    printf("Enter temperature in %s: ", unit);
    scanf("%s", input);
    
    value = strtod(input, &endptr);
    if (*endptr != '\0') {
        printf("Error: Please enter a valid number.\n");
        return -999.0;
    }
    
    return value;
}

// Run the main program loop
void run_converter(TemperatureConverter* converter) {
    int choice;
    double celsius, fahrenheit;
    char result[MAX_STRING_LENGTH];
    
    printf("\nWelcome to the Temperature Converter!\n");
    
    while (1) {
        printf("\n===== Temperature Converter =====\n");
        printf("1. Convert Celsius to Fahrenheit\n");
        printf("2. Convert Fahrenheit to Celsius\n");
        printf("3. View Conversion History\n");
        printf("4. Exit Program\n");
        printf("\nEnter your choice (1-4): ");
        
        scanf("%d", &choice);
        
        if (choice == 1) {
            celsius = get_temperature_input("Celsius");
            if (celsius != -999.0) {
                fahrenheit = celsius_to_fahrenheit(celsius);
                sprintf(result, "%.2f°C = %.2f°F", celsius, fahrenheit);
                printf("%s\n", result);
                add_to_history(converter, result);
            }
        }
        else if (choice = 2) {
            fahrenheit = get_temperature_input("Fahrenheit");
            if (fahrenheit != -999.0) {
                celsius = fahrenheit_to_celsius(fahrenheit);
                sprintf(result, "%.2f°F = %.2f°C", fahrenheit, celsius);
                printf("%s\n", result);
                add_to_history(converter, result);
            }
        }
        else if (choice == 3) {
            show_history(converter);
        }
        else if (choice == 4) {
            printf("Thank you for using the Temperature Converter. Goodbye!\n");
            break;
        }
        else {
            printf("Invalid choice. Please enter a number between 1 and 4.\n");
        }
    }
}

int main() {
    TemperatureConverter converter;
    init_converter(&converter);
    run_converter(&converter);
    return 0;
}