import os
from fastcore.foundation import *

def nb_to_post(input_path='./notebooks',output_path='./html'):
    os.system(f"rm ./{output_path}/*.html")
    os.system(f'jupyter nbconvert --to html {input_path}/*.ipynb') # eventually --template basic then css style
    os.system(f"mv ./{input_path}/*.html ./{output_path}/")
    
def get_slice(file,start_str,end_str):
    with open(file) as f:
        tmp = f.read()    
    slice1 = tmp[tmp.find(start_str)+len(start_str):]
    out = slice1[:slice1.find(end_str)]
    return out
    
    
if __name__ == "__main__":
    nb_to_post()
    directory = './html'
    posts = L(os.listdir(directory))
    posts.sort(reverse=True)    
    
    for post in [o for o in posts if o[-5:]=='.html']:

        with open(f"./html/{post}") as file: htmlfile = file.read()

        section1 = htmlfile[:htmlfile.find("</body>")]
        section2 = htmlfile[htmlfile.find("</body>"):]
        new_section = '''\n\n<script src="postformatting.js"></script>\n\n'''

        new_html = section1+new_section+section2

        with open(f"./html/{post}",'w') as file: file.write(new_html)
            
            
    htmls = []
    for post in posts:
        if post[-5:] != '.html': continue
        date = post[:10]

        name_tmp = post[11:-5]
        name = ''
        for i, letter in enumerate(name_tmp):
            if i and letter.isupper() and not name_tmp[i-1].isupper():
                name += ' '

            name += letter  
        description = get_slice(f'html/{post}','Post Description:</strong> ','</p>')
        tags = get_slice(f'html/{post}','Post Categories:</strong> ','</p>')

        htmls.append('<div class="smallblogdiv">')
        htmls.append(f'''<a class="postlink" href="./posts/html/{post}">{name}</a>''')
        htmls.append(f'''<p class="postdescription">{description}</p>''')
        htmls.append(f'''<p class="posttags">Tags: {tags}</p>''')
        htmls.append(f'''<p class="postdate">{date}</p>''')
        htmls.append('''</div>''')
    htmls = '\n              '.join(htmls)
    
    with open("blog_template.html") as f: tmp = f.read()
    tmp = tmp.replace('AUTOINSERTIONPOINT',htmls)
    with open("../blog.html",'w') as f: f.write(tmp)