import os
import json

def gerar_json_categorizado():
   
    extensoes = ('.jpg', '.jpeg', '.png', '.webp', '.pdf')
    
  
    pastas_alvo = {
        "projetos3d": "imagesP3D",    
        "executivos": "imagesPEXE",
        "planilhas": "imagesPlanilhas" 
    }
    
    dados_finais = {}

    print("--- Iniciando Mapeamento de Arquivos ---")

    for chave, pasta in pastas_alvo.items():
        if os.path.exists(pasta):
            # Lista apenas os arquivos com as extensões permitidas
            arquivos = [f for f in os.listdir(pasta) if f.lower().endswith(extensoes)]
            dados_finais[chave] = arquivos
            print(f" Pasta '{pasta}': {len(arquivos)} arquivos encontrados.")
        else:
            dados_finais[chave] = []
            print(f" Aviso: A pasta '{pasta}' não foi encontrada na raiz.")

    # Salva o resultado no imagens.json
    try:
        with open('imagens.json', 'w', encoding='utf-8') as f:
            json.dump(dados_finais, f, indent=4, ensure_ascii=False)
        print("\n Sucesso! O arquivo 'imagens.json' foi atualizado com as 3 categorias.")
    except Exception as e:
        print(f"\n Erro ao salvar o arquivo: {e}")

if __name__ == "__main__":
    gerar_json_categorizado()
