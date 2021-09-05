import os

def nb_to_post(input_path='./notebooks',output_path='./html'):
    os.system('jupyter nbconvert --to html *.ipynb') # eventually --template basic then css style
    os.system(f"mv {input_path}/*.html {output_path}/")

def build_bloghtml(directory):
    os.lisdir(directory)
if __name__ == "__main__": nb_to_post()