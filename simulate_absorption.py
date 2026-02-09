def simulate_absorption(numbers, absorption_rate):
    """
    Simulates a process where each element "absorbs" value from its neighbors
    based on an absorption rate.
    
    Args:
        numbers: a list of integers or floats with 2-50 elements
        absorption_rate: a float (0.0-1.0) representing the strength of absorption
    
    Returns:
        A new list with absorbed values, each rounded to two decimal places
    """
    n = len(numbers)
    result = []
    
    for i in range(n):
        if i == 0:
            # First element: only has right neighbor
            new_value = numbers[0] + absorption_rate * (numbers[1] - numbers[0])
        elif i == n - 1:
            # Last element: only has left neighbor
            new_value = numbers[n-1] + absorption_rate * (numbers[n-2] - numbers[n-1])
        else:
            # Interior element: average of two neighbors
            avg_neighbors = (numbers[i-1] + numbers[i+1]) / 2
            new_value = numbers[i] + absorption_rate * (avg_neighbors - numbers[i])
        
        result.append(round(new_value, 2))
    
    return result


# Test cases
if __name__ == "__main__":
    # Example 1
    numbers1 = [10, 20, 30]
    absorption_rate1 = 0.5
    result1 = simulate_absorption(numbers1, absorption_rate1)
    print(f"Example 1: {result1}")
    print(f"Expected: [15.0, 20.0, 25.0]")
    print(f"Match: {result1 == [15.0, 20.0, 25.0]}\n")
    
    # Example 2
    numbers2 = [0, 100, 0, 100]
    absorption_rate2 = 0.67
    result2 = simulate_absorption(numbers2, absorption_rate2)
    print(f"Example 2: {result2}")
    print(f"Expected: [67.0, 33.0, 67.0, 33.0]")
    print(f"Match: {result2 == [67.0, 33.0, 67.0, 33.0]}\n")
