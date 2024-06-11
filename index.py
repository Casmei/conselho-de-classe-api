import csv
import uuid
from datetime import datetime

# Função para adicionar UUID e datas a cada linha
def add_uuid_and_dates_to_csv(input_csv, output_csv):
    with open(input_csv, 'r') as infile, open(output_csv, 'w', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        for row in reader:
            row.insert(0, str(uuid.uuid4()))  # Adiciona UUID na primeira coluna
            row.insert(1, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))  # Adiciona data atual na segunda coluna
            row.insert(2, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))  # Adiciona data e hora atuais na terceira coluna
            writer.writerow(row)

# Nome dos arquivos de entrada e saída
input_csv = 'STUDENTS.csv'
output_csv = 'output.csv'

# Chamada da função
add_uuid_and_dates_to_csv(input_csv, output_csv)
