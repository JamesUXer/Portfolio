"""Prepare the approved island paths for the site and its line animation.
Run after an intentional update to previews/island-trial/island-trial.svg.
The review image and comparison controls are never included in production assets.
"""
from copy import deepcopy
from pathlib import Path
import re
import xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
NS='http://www.w3.org/2000/svg'
ET.register_namespace('',NS)
review_source=ROOT/'previews/island-trial/island-trial.svg'
source=ET.parse(review_source if review_source.exists() else ROOT/'assets/images/island-hand-drawn.svg').getroot()
defs=deepcopy(source.find(f'{{{NS}}}defs'))
for child in list(defs):
    if child.get('id') in {'source-alpha','original'}:
        defs.remove(child)
drawing_source=source.find(f'{{{NS}}}g[@id="revised"]')
if drawing_source is None:
    drawing_source=source.find(f'{{{NS}}}g[@id="island-drawing"]')
assert drawing_source is not None, 'Missing approved drawing'
drawing=deepcopy(drawing_source)
drawing.set('id','island-drawing')

def root_for(definitions,content):
    root=ET.Element(f'{{{NS}}}svg',{'viewBox':'0 0 669 399','aria-hidden':'true'})
    root.append(definitions);root.append(content)
    return root

def write_svg(path,root):
    ET.indent(root,space='  ')
    (ROOT/path).write_text(ET.tostring(root,encoding='unicode')+'\n')

base=root_for(deepcopy(defs),deepcopy(drawing))
write_svg('assets/images/island-hand-drawn.svg',base)

# The sheen graph reads path coordinates directly, so bake the six fir-tree
# transforms into their centreline paths. Their drawing remains identical.
trace=deepcopy(drawing)
trace.set('id','hero-traced-lines')
trace.attrib.pop('opacity',None)
trace.set('stroke','none')
for group in trace.iter(f'{{{NS}}}g'):
    transform=group.get('transform')
    if not transform: continue
    match=re.fullmatch(r'translate\(([-.\d]+) ([-.\d]+)\) scale\(([-.\d]+)\)',transform)
    assert match, f'Unsupported animation transform: {transform}'
    tx,ty,scale=map(float,match.groups())
    for path in group.findall(f'{{{NS}}}path'):
        assert not re.search('[AHVSTahvst]',path.get('d')), 'Unexpected path command'
        n=[0]
        def coord(m):
            i=n[0];n[0]+=1
            return f'{float(m.group())*scale+(tx if i%2==0 else ty):.4f}'.rstrip('0').rstrip('.')
        path.set('d',re.sub(r'-?\d+(?:\.\d+)?',coord,path.get('d')))
    del group.attrib['transform']
write_svg('assets/images/island-hand-drawn-trace.svg',root_for(deepcopy(defs),trace))

# The Playground keeps its school portal; all authored gear and pipe paths are
# the same as the shared asset, with IDs namespaced away from the sheen SVG.
playground=root_for(deepcopy(defs),deepcopy(drawing))
for element in playground.iter():
    if element.get('id'):
        element.set('id','pg-'+element.get('id'))
    for attr,value in list(element.attrib.items()):
        value=re.sub(r'url\(#([^)]+)\)',r'url(#pg-\1)',value)
        if attr=='href' and value.startswith('#'): value='#pg-'+value[1:]
        element.set(attr,value)
playground.find(f'.//{{{NS}}}g[@id="pg-connected-machine"]').set('id','playground-machinery-drawing')
pgdefs=playground.find(f'{{{NS}}}defs')
mask=ET.SubElement(pgdefs,f'{{{NS}}}mask',{'id':'pg-school-clearance','maskUnits':'userSpaceOnUse','x':'0','y':'0','width':'669','height':'399','style':'mask-type:luminance'})
ET.SubElement(mask,f'{{{NS}}}rect',{'width':'669','height':'399','fill':'white'})
ET.SubElement(mask,f'{{{NS}}}path',{'d':'M326 136 V113 L334.5 107 L343 113 V101 H338 L376 77 L414 101 H409 V113 L417.5 107 L426 113 V136 Z','fill':'black'})
pgdrawing=playground.find(f'{{{NS}}}g[@id="pg-island-drawing"]')
wrapper=ET.Element(f'{{{NS}}}g',{'mask':'url(#pg-school-clearance)'})
playground.remove(pgdrawing);wrapper.append(pgdrawing);playground.append(wrapper)
playground.set('class','hero-artwork island-developed')
ET.indent(playground,space='  ')
html=(ROOT/'playground.html').read_text()
a=html.index('<svg class="hero-artwork island-developed"')
b=html.index('</svg>',a)+len('</svg>')
html=html[:a]+ET.tostring(playground,encoding='unicode')+html[b:]
(ROOT/'playground.html').write_text(html)
print('Prepared shared artwork, matching animation paths and Playground drawing.')
