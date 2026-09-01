import glob
try:
    import pypdf
    for f in glob.glob('/Users/ommprakashmohanty/.gemini/antigravity-ide/brain/95f1fc74-247b-42bf-99df-f682096da18d/.user_uploaded/*.pdf'):
        reader = pypdf.PdfReader(f)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
        if 'Versatile Software Engineer' in text:
            print(f'FOUND IN: {f}')
except ImportError:
    import PyPDF2
    for f in glob.glob('/Users/ommprakashmohanty/.gemini/antigravity-ide/brain/95f1fc74-247b-42bf-99df-f682096da18d/.user_uploaded/*.pdf'):
        reader = PyPDF2.PdfReader(f)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
        if 'Versatile Software Engineer' in text:
            print(f'FOUND IN: {f}')
