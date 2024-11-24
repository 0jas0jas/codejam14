import openai
import json
import requests

# Set up the OpenAI API key
openai.api_key = ''

def ProdNameByID(ID : int):
    product_id = str(ID)
    request_url = f"https://world.openfoodfacts.org/api/v0/product/{product_id}.json"
    response = requests.get(request_url) 
    info_dict = json.loads(response.text)

    prod_name = info_dict['product']['product_name_en']
    return prod_name

def generate_recipes(ID: int):
    product_name = ProdNameByID(ID)
    # Define the prompt with dynamic product_name
    msg = f"""
    Given the product name "{product_name}", generate a nested dictionary containing 5 recipes. Each recipe should have the following structure:
    - A key for the recipe name (string).
    - A key for the ingredients (list of strings). The ingredients should match names of common ingredients found in the OpenFoods directory.
    
    The output should look like this:
    {{
        "recipe_1": {{
            "name": "Recipe Name 1",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_2": {{
            "name": "Recipe Name 2",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_3": {{
            "name": "Recipe Name 3",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_4": {{
            "name": "Recipe Name 4",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_5": {{
            "name": "Recipe Name 5",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }}
    }}
    Generate the recipes based on the following product name: "{product_name}"
    """

    # Call the OpenAI API
    response = openai.chat.completions.create(
        model="gpt-4o",  # Use the model you prefer
        messages=msg,
        max_tokens=500,  # Adjust token limit as needed
        temperature=0.7
    )

    # Return the API response
    return response.choices[0].text.strip()

print(generate_recipes(3242274002053))