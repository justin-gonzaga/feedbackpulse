# temperature program

h = []

def c2f(c):
    f = c * 9/5 + 32
    return f

def f2c(f):
    return (f - 32) * 5/9

def main():
    run = True
    while run == True:
        print("Temperature Converter")
        print("1. c to f")
        print("2. f to c")
        print("3. history")
        print("4. quit")
        choice = input("pick: ")
        
        if choice == '1':
            cel = input("enter celsius: ")
            try:
                cel = float(cel)
                result = c2f(cel)
                print(cel, "C =", result, "F")
                h.append(str(cel) + " C = " + str(result) + " F")
            except:
                print("error")
        
        if choice == '2':
            fahr = input("enter fahrenheit: ")
            try:
                fahr = float(fahr)
                result = f2c(fahr)
                print(fahr, "F =", result, "C")
                h.append(str(fahr) + " F = " + str(result) + " C")
            except:
                print("error")
        
        if choice == '3':
            if len(h) == 0:
                print("no history")
            else:
                print("History:")
                for i in h:
                    print(i)
        
        if choice == '4':
            run = False
        
        if choice not in ['1', '2', '3', '4']:
            print("bad choice")

main()