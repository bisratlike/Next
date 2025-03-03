import os
from pathlib import Path

def extract_direct_ts_files(directory):
    dir_path = Path(directory)
    return [file for file in dir_path.iterdir() if file.suffix in ['.ts', '.tsx']]

def write_files_to_output(files, output_file):
    with open(output_file, 'w', encoding='utf-8') as output:
        for file in files:
            output.write(f"--- File: {file.name} ---\n")
            with open(file, 'r', encoding='utf-8') as f:
                output.write(f.read())
            output.write("\n\n")

app_dir = os.path.join(os.getcwd(), 'app')
component_dir = os.path.join(os.getcwd(), 'components')
db_dir= os.path.join(os.getcwd(), 'db')
lib_dir = os.path.join(os.getcwd(), 'lib')
app_files = extract_direct_ts_files(app_dir)
component_files = extract_direct_ts_files(component_dir)
db_files = extract_direct_ts_files(db_dir)
lib_files = extract_direct_ts_files(lib_dir)
all_ts_files = app_files + component_files+ db_files + lib_files

output_file = os.path.join(os.getcwd(), 'output.txt')
write_files_to_output(all_ts_files, output_file)

print(f"Extracted contents from TypeScript files have been written to {output_file}")
