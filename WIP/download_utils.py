import logging, os, zipfile, sys
from pathlib import Path
import requests

logger = logging.getLogger(name="jupyter")
if len(logger.handlers) == 0: logger.addHandler(logging.StreamHandler(stream=sys.stdout))
logger.setLevel(logging.INFO)
    

def unzip_file(zip_path,extract_path,log=False):
    '''
    zip path is a pathlib.Path to the zip file
    Extract path is a pathlib.Path to the file to be created/overwritten
    '''
    if log: logger.info('Unzipping archive...')
    if not os.path.exists(extract_path.parent): os.makedirs(extract_path.parent)
    with zipfile.ZipFile(zip_path, 'r') as zipped_archive:
        data_file = zipped_archive.namelist()[0]
        zipped_archive.extract(data_file, extract_path)  


def download_file(url,dl_fname,log=False):
    if type(dl_fname) == str: out_path = Path(dl_fname)
    if not os.path.exists(dl_fname.parent): os.makedirs(dl_fname.parent)
    if log: logger.info('Getting...')
    r = requests.get(url, stream=True)
    if log: logger.info('Writing...')
    with open(dl_fname, 'wb') as f:
        for chunk in r.iter_content(chunk_size=30720):
            f.write(chunk)
            f.flush()


