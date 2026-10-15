import os
import time
import urllib.request
import urllib.parse
from PIL import Image

IMAGES_DIR = os.path.abspath('public/images')
WORKS_DIR = os.path.join(IMAGES_DIR, 'works')
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(WORKS_DIR, exist_ok=True)

# Curated list of verified authentic Wikimedia Commons & direct photos
PHOTO_SOURCES = {
    'aiyar': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/South_Indian_wedding_2.jpg/1280px-South_Indian_wedding_2.jpg',
    'melam-nadhasvaram': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Thavil_being_performed_in_South_Indian_Marriage_JEG6748.JPG/1280px-Thavil_being_performed_in_South_Indian_Marriage_JEG6748.JPG',
    'manamakal-malai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg/1280px-Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg',
    'bridal-groom': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/South_Indian_Marriage.jpg/1280px-South_Indian_Marriage.jpg',
    'mack-up': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Bridal_makeup_for_Indian_Wedding.jpg/1280px-Bridal_makeup_for_Indian_Wedding.jpg',
    'food-stall': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Onam_Sadhya_served_on_banana_leaf_at_Wiki_Conference_India_2026_in_Crown_Plaza_Hotel_in_Kochi_01.jpg/1280px-Onam_Sadhya_served_on_banana_leaf_at_Wiki_Conference_India_2026_in_Crown_Plaza_Hotel_in_Kochi_01.jpg',
    'violin-program': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Carnatic_violins.jpg/1280px-Carnatic_violins.jpg',
    'horse-chariot': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Baraat_-_Odia_Hindu_Wedding_Ceremony_-_Kamakhyanagar_-_Dhenkanal_2018-01-24_7714.JPG/1280px-Baraat_-_Odia_Hindu_Wedding_Ceremony_-_Kamakhyanagar_-_Dhenkanal_2018-01-24_7714.JPG',
    'grand-stage-teal-halo': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Indian_Wedding_Mandap_Decoration.jpg/1280px-Indian_Wedding_Mandap_Decoration.jpg',
    'grand-stage-aandal-mandap': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Indian_Wedding_Mandap.jpg/1280px-Indian_Wedding_Mandap.jpg',
    'arkestra-music': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Thavil_being_performed_in_South_Indian_Marriage_JEG6748.JPG/1280px-Thavil_being_performed_in_South_Indian_Marriage_JEG6748.JPG',
    
    # Works 1 to 8: Real Indian celebration and stage decor photos
    'work-1': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Indian_Wedding_Mandap_Decoration.jpg/1280px-Indian_Wedding_Mandap_Decoration.jpg',
    'work-2': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Stage_arrangement.jpg/1280px-Stage_arrangement.jpg',
    'work-3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/MarriageRECEPTION-India-tamilword23.2.jpg/1280px-MarriageRECEPTION-India-tamilword23.2.jpg',
    'work-4': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Birthday_party_decoration.jpg/1280px-Birthday_party_decoration.jpg',
    'work-5': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/33/Indian_Wedding_Mandap.jpg/1280px-Indian_Wedding_Mandap.jpg',
    'work-6': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Stage_decoration_model.jpg/1280px-Stage_decoration_model.jpg',
    'work-7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg/1280px-Indian_Wedding_Ritual_-_Jaimala_or_Varmala_%2801%29.jpg',
    'work-8': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Birthday_decoration.jpg/1280px-Birthday_decoration.jpg',
}

def download_and_process():
    for key, url in PHOTO_SOURCES.items():
        is_work = key.startswith('work-')
        dest_dir = WORKS_DIR if is_work else IMAGES_DIR
        png_path = os.path.join(dest_dir, f'{key}.png')
        webp_path = os.path.join(dest_dir, f'{key}.webp')
        temp_path = os.path.join(dest_dir, f'{key}_temp.jpg')
        
        print(f"Downloading {key}...")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'AmmanEventsApp/1.0 (info@ammanevents.com)'})
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = resp.read()
                with open(temp_path, 'wb') as f:
                    f.write(data)
            
            # Process with PIL
            with Image.open(temp_path) as im:
                im = im.convert('RGB')
                target_w, target_h = (1000, 1000) if is_work else (1200, 800)
                
                # Aspect fill crop
                src_w, src_h = im.size
                src_ratio = src_w / src_h
                tgt_ratio = target_w / target_h
                
                if src_ratio > tgt_ratio:
                    new_w = int(src_h * tgt_ratio)
                    left = (src_w - new_w) // 2
                    im = im.crop((left, 0, left + new_w, src_h))
                else:
                    new_h = int(src_w / tgt_ratio)
                    top = (src_h - new_h) // 2
                    im = im.crop((0, top, src_w, top + new_h))
                
                im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)
                
                # Save WebP
                im.save(webp_path, 'WEBP', quality=85)
                # Save PNG
                im.save(png_path, 'PNG', optimize=True)
                
            if os.path.exists(temp_path):
                os.remove(temp_path)
                
            print(f"✓ {key} saved! (PNG: {os.path.getsize(png_path)//1024}KB, WebP: {os.path.getsize(webp_path)//1024}KB)")
        except Exception as e:
            print(f"✗ Failed {key}: {e}")
            if os.path.exists(temp_path):
                try: os.remove(temp_path)
                except: pass
        
        time.sleep(1.2) # Be polite to Wikimedia CDN

if __name__ == '__main__':
    download_and_process()
