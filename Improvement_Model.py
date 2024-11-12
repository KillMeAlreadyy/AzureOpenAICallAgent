import os
from openai import AzureOpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

# Load environment variables
endpoint = os.getenv("ENDPOINT_URL", "<insert Azure OpenAI Endpoint here here>")
deployment = os.getenv("DEPLOYMENT_NAME", "gpt-4o")
search_endpoint = os.getenv("SEARCH_ENDPOINT", "<insert Azure Cognitive Search Endpoint here>")
search_index = os.getenv("SEARCH_INDEX_NAME", "fileupload-avaimprov")
search_key = os.getenv("SEARCH_KEY", "<insert key here>")  # Moved to env variable
kba = False

def getClient():
    """Creates and returns an Azure OpenAI client."""
    token_provider = get_bearer_token_provider(
        DefaultAzureCredential(),
        "https://cognitiveservices.azure.com/.default"
    )
    client = AzureOpenAI(
        azure_endpoint=endpoint,
        azure_ad_token_provider=token_provider,
        api_version="2024-05-01-preview",
    )
    return client

def sendQuestion(client, question, index_name, kba=False):
    """Sends a question to the Azure OpenAI model and retrieves the response."""
    while True:
        completion = client.chat.completions.create(
            model=deployment,
            messages=[{"role": "user", "content": question}],
            max_tokens=800,
            temperature=0,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
            stream=False,
            extra_body={
                "data_sources": [{
                    "type": "azure_search",
                    "parameters": {
                        "endpoint": search_endpoint,
                        "index_name": index_name,
                        "semantic_configuration": "default",
                        "query_type": "semantic",
                        "fields_mapping": {},
                        "in_scope": True,
                        "role_information": "",
                        "filter": None,
                        "strictness": 3,
                        "top_n_documents": 5,
                        "authentication": {
                            "type": "api_key",
                            "key": search_key
                        }
                    }
                }]
            }
        )
        
        response_content = completion.choices[0].message.content
        
        if not kba and (
            response_content.startswith("Die abgerufenen Dokumente enthalten keine Informationen darüber") or
            response_content.startswith("The requested information is not found in the retrieved data")
        ):
            index_name = "webknowledgebase"  # Update index name for KBA
            kba = True  # Set kba to True to avoid further recursion
        else:
            return response_content  # Return the response if not KBA
