import os
from dotenv import load_dotenv

import openai
import json
import requests

from freestyle import HealthScoreByID

load_dotenv()

OPENAI_API_SECRET = os.getenv('OPENAI_API_SECRET')

# Set up the OpenAI API key
openai.api_key = OPENAI_API_SECRET



def ProdNameByID(ID : int):
    product_id = str(ID)
    request_url = f"https://world.openfoodfacts.org/api/v0/product/{product_id}.json"
    response = requests.get(request_url) 
    info_dict = json.loads(response.text)

    prod_name = info_dict['product']['product_name']
    return prod_name

def generate_recipes(ID: int) -> str:
    found = HealthScoreByID(ID)
    if found == -1 :
        return json.dumps(-1)
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
        messages=[{"role": "user", "content": msg}],
        max_tokens=500,  # Adjust token limit as needed
        temperature=0.7
    )

    # Return the API response
    return response.choices[0].message.content

# write a prompt if a person selects I didnt find items for the recipe 
# give 5 new recipes
# new function that does the same thing but gives a prompt saying give 5 new recipes 
def generate_new_recipes(ID: int) -> str:
    found = HealthScoreByID(ID)
    if found == -1 :
        return json.dumps(-1)
    product_name = ProdNameByID(ID)
    # Define the prompt with dynamic product_name
    msg = f"""
    The previously suggested recipes for {product_name} included ingredients that are either unavailable or not suitable. 
    Generate a completely new set of 5 recipes that are unique and distinct from the previous ones. 
    Do not reuse the recipe names or ingredients from the previous recipes. 

    Each recipe should have the following structure:
    - A key for the recipe name (string).
    - A key for the ingredients (list of strings). The ingredients should match names of common ingredients found in the OpenFoods directory.
    
    The output should look like this:
    {{
        "recipe_1": {{
            "name": "New Recipe Name 1",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_2": {{
            "name": "New Recipe Name 2",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_3": {{
            "name": "New Recipe Name 3",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_4": {{
            "name": "New Recipe Name 4",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }},
        "recipe_5": {{
            "name": "New Recipe Name 5",
            "ingredients": ["ingredient_1", "ingredient_2", "ingredient_3"]
        }}
    }}
    Generate the recipes based on the following product name: "{product_name}"
    """
    response = openai.chat.completions.create(
        model="gpt-4o",  # Use the model you prefer
        messages=[{"role": "user", "content": msg}],
        max_tokens=500,  # Adjust token limit as needed
        temperature=0.7
    )

    # Return the API response
    return response.choices[0].message.content

# gets a list of items
# prompts chatgpt to tell you if 50% of these items are indian or not
# 

def isIndian(product_names) -> str :
    msg = f"""
    Given a list of products "{product_names}", determine whether more than 50% of the list contains Indian Food Items or not. 
    Just reply with a yes or no
    """

    # Call the OpenAI API
    response = openai.chat.completions.create(
        model="gpt-4o",  # Use the model you prefer
        messages=[{"role": "user", "content": msg}],
        max_tokens=500,  # Adjust token limit as needed
        temperature=0.7
    )

    # Return the API response
    return response.choices[0].message.content

# print(generate_recipes(96619281893)) # valid
# print(generate_recipes(84881900749)) # invalid

# print("1.\n", generate_recipes(1234)) # valid
# print("2.\n", generate_new_recipes(1234)) # valid

# print(isIndian(score_stack.products[:]))
print(isIndian({
    "Ghee",
    "Ghee",
      "Organic Fresh Young Chicken",
      "Organic Fresh Young Chicken",
      "Organic Fresh Young Chicken",
      "Mini biscuits aux grains de chocolat",
      "Mini biscuits aux grains de chocolat",
      "Mini biscuits aux grains de chocolat",
      "Mini biscuits aux grains de chocolat",
      "Mini biscuits aux grains de chocolat"

}))
