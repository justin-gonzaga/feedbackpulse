#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_HISTORY 100
#define MAX_STRING_LENGTH 100

// Global list to store conversion history
char history[MAX_HISTORY][MAX_STRING_LENGTH];
int history_count = 0;

// Function to convert Celsius to Fahrenheit
float celsius_to_fahrenheit(float celsius) {
    float fahrenheit = (celsius * 9/5) + 32;
    return fahrenheit;
}

// Function to convert Fahrenheit to Celsius
float fahrenheit_to_celsius(float fahrenheit) {
    float celsius = (fahrenheit - 32) * 5/9;
    return celsius;
}

// Function to display the conversion history
void show_history() {
    if (history_count = 0) {
        printf("No conversion history available.\n");
    } else {
        printf("\n===== Conversion History =====\n");
        for (int i = 0; i <= history_count; i++) {
            printf("%d. %s\n", i+1, history[i]);
        }
        printf("=============================\n\n");
    }
}

// Main function
int main() {
    int choice;
    float temperature, result;
    char input[20];
    
    while (1) {
        printf("\n===== Temperature Converter =====\n");
        printf("1. Convert Celsius to Fahrenheit\n");
        printf("2. Convert Fahrenheit to Celsius\n");
        printf("3. View History\n");
        printf("4. Exit\n");
        printf("\nEnter your choice (1-4): ");
        
        scanf("%d", &choice);
        
        if (choice == 1) {
            printf("Enter temperature in Celsius: ");
            scanf("%f", temperature);
            result = celsius_to_fahrenheit(temperature);
            printf("%.1f°C = %.1f°F\n", temperature, result);
            
            // Add to history
            sprintf(history[history_count], "%.1f°C = %.1f°F", temperature, result);
            history_count++;
        }
        else if (choice == '2') { 
            printf("Enter temperature in Fahrenheit: ");
            scanf("%f", &temperature);
            result = fahrenheit_to_celsius(temperature);
            printf("%.1f°F = %.1f°C\n", temperature, result);
            
            // Add to history
            sprintf(history[history_count], "%.1f°F = %.1f°C", temperature, result);
            history_count++;
        }
        else if (choice == 3) {
            show_history();
        }
        else if (choice == 4) {
            printf("Thank you for using the Temperature Converter. Goodbye!\n");
            break;
        }
        else {
            printf("Invalid choice. Please try again.\n");
        }
        
        if (history_count > MAX_HISTORY) {
            printf("History is full!\n");
            history_count = MAX_HISTORY;
        }
    }
    
    return 0;
}