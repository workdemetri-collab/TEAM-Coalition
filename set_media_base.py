#!/usr/bin/env python3
"""
Change where photos/PDFs are loaded from. Run inside this folder.

  python3 set_media_base.py https://old.teamcoalition.org     (images live on another address)
  python3 set_media_base.py ""                                  (images were copied into this folder)

By default the site loads every image and PDF from https://teamcoalition.org/wp-content/uploads/...
(your current WordPress site). When you move teamcoalition.org to the new site, that address will
stop serving them, so first keep the old site reachable on a new address (e.g. old.teamcoalition.org)
and run this script with that address.
"""
import os,re,sys
if len(sys.argv)<2: sys.exit(__doc__)
new=sys.argv[1].rstrip('/')
root=os.path.dirname(os.path.abspath(__file__))
m=re.search(r'rel="icon" href="((?:https?://[^/"]+)?)/wp-content/uploads/',open(os.path.join(root,'index.html'),encoding='utf-8').read())
old=m.group(1) if m else 'https://teamcoalition.org'
pat=re.compile(r'(?<=["\'(])'+re.escape(old)+r'(?=/(?:wp-content/uploads|documents)/)')
n=0
for r,_,fs in os.walk(root):
    for f in fs:
        if f.endswith(('.html','.css')):
            p=os.path.join(r,f); s=open(p,encoding='utf-8').read(); t=pat.sub(new,s)
            if t!=s: open(p,'w',encoding='utf-8').write(t); n+=1
print('Updated %d files: %s -> %s'%(n,old or '(this folder)',new or '(this folder)'))
