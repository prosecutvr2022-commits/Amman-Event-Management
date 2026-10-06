import os
import math
import subprocess

WIDTH = 540
HEIGHT = 960
FPS = 25
DURATION = 17
TOTAL_FRAMES = FPS * DURATION

def clamp(v, low=0, high=255):
    return max(low, min(high, int(v)))

def generate():
    os.makedirs('public', exist_ok=True)
    out_file = 'public/hero_event_video.mp4'
    
    ffmpeg_cmd = [
        'ffmpeg', '-y',
        '-f', 'image2pipe',
        '-vcodec', 'ppm',
        '-r', str(FPS),
        '-i', '-',
        '-f', 'lavfi',
        '-i', 'sine=frequency=523:beep_factor=3:duration=17',
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-profile:v', 'baseline',
        '-level', '3.0',
        '-crf', '22',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-c:a', 'aac',
        '-b:a', '96k',
        '-shortest',
        out_file
    ]
    
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    header = f"P6\n{WIDTH} {HEIGHT}\n255\n".encode('ascii')
    
    print(f"Rendering {TOTAL_FRAMES} authentic reel frames...")
    
    for f in range(TOTAL_FRAMES):
        t = f / FPS
        frame = bytearray(WIDTH * HEIGHT * 3)
        
        # Determine scene
        if t < 3.5:
            scene_idx = 1
            scene_t = t
        elif t < 7.5:
            scene_idx = 2
            scene_t = t - 3.5
        elif t < 11.0:
            scene_idx = 3
            scene_t = t - 7.5
        elif t < 14.0:
            scene_idx = 4
            scene_t = t - 11.0
        else:
            scene_idx = 5
            scene_t = t - 14.0
            
        # Background gradient based on scene theme
        for y in range(HEIGHT):
            ratio = y / HEIGHT
            y_off = y * WIDTH * 3
            
            if scene_idx == 1:
                # Royal Navy with warm gold candle glow
                r = clamp(8 + 25 * ratio + 10 * math.sin(scene_t * 2))
                g = clamp(15 + 20 * ratio)
                b = clamp(35 + 40 * ratio)
            elif scene_idx == 2:
                # Romantic Magenta / Rose Gold
                r = clamp(40 + 35 * (1 - ratio) + 15 * math.sin(scene_t * 3))
                g = clamp(12 + 15 * ratio)
                b = clamp(35 + 25 * ratio)
            elif scene_idx == 3:
                # Festive Kasavu Gold & Vermilion
                r = clamp(45 + 30 * ratio + 10 * math.sin(scene_t * 2))
                g = clamp(25 + 25 * ratio)
                b = clamp(10 + 15 * ratio)
            elif scene_idx == 4:
                # Deep Amman Brand Blue
                r = clamp(10 + 15 * ratio)
                g = clamp(25 + 35 * ratio)
                b = clamp(60 + 45 * ratio)
            else:
                # Emerald Green & Warm Gold
                r = clamp(15 + 25 * ratio)
                g = clamp(40 + 35 * ratio)
                b = clamp(25 + 20 * ratio)
                
            for x in range(WIDTH):
                idx = y_off + x * 3
                frame[idx] = r
                frame[idx + 1] = g
                frame[idx + 2] = b
                
        # Draw Gold Decorative Mandap Arch & Border
        arch_cx, arch_cy = WIDTH // 2, 380
        arch_r = int(170 + 8 * math.sin(t * 3))
        
        # Gold Border Frame
        for y in range(HEIGHT):
            for x in range(WIDTH):
                if x < 6 or x >= WIDTH - 6 or y < 6 or y >= HEIGHT - 6:
                    idx = (y * WIDTH + x) * 3
                    frame[idx] = 223
                    frame[idx+1] = 183
                    frame[idx+2] = 108
                    
        # Confetti & Sparkles
        for p in range(50):
            seed = p * 137 + int(t * 110)
            px = int(((p * 73 + math.sin(t * 2 + p) * 40) % (WIDTH - 40)) + 20)
            py = int((seed % (HEIGHT - 80)) + 40)
            p_size = (p % 3) + 2
            
            for dy in range(-p_size, p_size):
                for dx in range(-p_size, p_size):
                    nx = px + dx
                    ny = py + dy
                    if 0 <= nx < WIDTH and 0 <= ny < HEIGHT:
                        idx = (ny * WIDTH + nx) * 3
                        # Golden or Rose sparkles
                        frame[idx] = 245
                        frame[idx+1] = clamp(190 + (p % 60))
                        frame[idx+2] = clamp(90 + (p % 100))

        # Central Decorative Circular Medallion / Stage
        for y in range(arch_cy - arch_r, arch_cy + arch_r):
            for x in range(arch_cx - arch_r, arch_cx + arch_r):
                d = math.sqrt((x - arch_cx)**2 + (y - arch_cy)**2)
                if abs(d - arch_r) < 4:
                    if 0 <= x < WIDTH and 0 <= y < HEIGHT:
                        idx = (y * WIDTH + x) * 3
                        frame[idx] = 223
                        frame[idx+1] = 183
                        frame[idx+2] = 108
                elif abs(d - (arch_r - 12)) < 2:
                    if 0 <= x < WIDTH and 0 <= y < HEIGHT:
                        idx = (y * WIDTH + x) * 3
                        frame[idx] = 180
                        frame[idx+1] = 140
                        frame[idx+2] = 60
                        
        proc.stdin.write(header)
        proc.stdin.write(frame)
        
    proc.stdin.close()
    proc.wait()
    print("Reel generation complete!")

if __name__ == '__main__':
    generate()
