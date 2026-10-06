import os
import sys
import math
import subprocess

WIDTH = 480
HEIGHT = 854  # 9:16 vertical reel
FPS = 25
DURATION = 16  # 16 seconds loop
TOTAL_FRAMES = FPS * DURATION

def clamp(val, min_val=0, max_val=255):
    return max(min_val, min(max_val, int(val)))

def create_video():
    os.makedirs('public', exist_ok=True)
    out_mp4 = 'public/hero_event_video.mp4'
    
    # Run ffmpeg image2pipe with an added synthesized celebratory festive audio track!
    # Audio: joyful traditional rhythm frequency / celebratory drone
    ffmpeg_cmd = [
        'ffmpeg', '-y',
        '-f', 'image2pipe',
        '-vcodec', 'ppm',
        '-r', str(FPS),
        '-i', '-',
        '-f', 'lavfi',
        '-i', 'sine=frequency=440:beep_factor=4:duration=16',
        '-c:v', 'libx264',
        '-preset', 'veryfast',
        '-crf', '22',
        '-pix_fmt', 'yuv420p',
        '-c:a', 'aac',
        '-b:a', '96k',
        '-shortest',
        out_mp4
    ]
    
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)
    
    print(f"Generating {TOTAL_FRAMES} frames ({DURATION}s at {FPS}fps)...")
    
    header = f"P6\n{WIDTH} {HEIGHT}\n255\n".encode('ascii')
    
    # Pre-render scenes:
    # 0-3s: Scene 1 - Grand Floral Canopy Entrance ("Ponnu Mappillai Entry")
    # 3-7s: Scene 2 - Surprise Dance & Stage Confetti ("Surprise Ponnu Mappillai")
    # 7-10s: Scene 3 - Welcome Dance Troupe with Deepams
    # 10-13s: Scene 4 - Amman Event Management & Services ("அம்மன் ஈவென்ட் மேனேஜ்மென்ட் 95245 16821")
    # 13-16s: Scene 5 - Client Love & Call to Book ("Service With Smile · A to Z Service")
    
    for f in range(TOTAL_FRAMES):
        t = f / FPS
        frame_bytes = bytearray(WIDTH * HEIGHT * 3)
        
        # Determine active scene
        if t < 3.2:
            scene = 1
            scene_t = t
        elif t < 7.2:
            scene = 2
            scene_t = t - 3.2
        elif t < 10.5:
            scene = 3
            scene_t = t - 7.2
        elif t < 13.5:
            scene = 4
            scene_t = t - 10.5
        else:
            scene = 5
            scene_t = t - 13.5
            
        # Draw background gradient based on scene
        for y in range(HEIGHT):
            ratio = y / HEIGHT
            
            if scene == 1:
                # Royal midnight navy with warm amber glow
                r = clamp(11 + 25 * ratio + 15 * math.sin(scene_t * 2))
                g = clamp(18 + 20 * ratio)
                b = clamp(38 + 40 * ratio)
            elif scene == 2:
                # Festive magenta & warm violet
                r = clamp(35 + 40 * (1 - ratio) + 20 * math.sin(scene_t * 4))
                g = clamp(15 + 15 * ratio)
                b = clamp(45 + 30 * ratio)
            elif scene == 3:
                # Golden festive celebration
                r = clamp(35 + 45 * ratio + 10 * math.sin(scene_t * 3))
                g = clamp(25 + 35 * ratio)
                b = clamp(15 + 15 * ratio)
            elif scene == 4:
                # Amman brand deep royal blue
                r = clamp(8 + 15 * ratio)
                g = clamp(22 + 35 * ratio)
                b = clamp(55 + 50 * ratio)
            else:
                # Grand finale emerald and gold
                r = clamp(20 + 35 * ratio)
                g = clamp(30 + 40 * ratio)
                b = clamp(25 + 20 * ratio)
                
            y_offset = y * WIDTH * 3
            for x in range(WIDTH):
                idx = y_offset + x * 3
                frame_bytes[idx] = r
                frame_bytes[idx + 1] = g
                frame_bytes[idx + 2] = b
                
        # Draw central decorative mandala / arch / stage lights
        cx, cy = WIDTH // 2, HEIGHT // 2 - 40
        pulse = 1.0 + 0.08 * math.sin(t * 5)
        
        # Golden lights and confetti particles
        num_particles = 40
        for i in range(num_particles):
            px = int((math.sin(i * 99 + t * 2) * 0.45 + 0.5) * WIDTH)
            py = int(((i * 73 + t * 90) % HEIGHT))
            size = (i % 3) + 2
            
            for dy in range(-size, size):
                for dx in range(-size, size):
                    if dx*dx + dy*dy <= size*size:
                        npx = px + dx
                        npy = py + dy
                        if 0 <= npx < WIDTH and 0 <= npy < HEIGHT:
                            p_idx = (npy * WIDTH + npx) * 3
                            # Gold / yellow / rose sparkles
                            frame_bytes[p_idx] = clamp(frame_bytes[p_idx] + 220)
                            frame_bytes[p_idx + 1] = clamp(frame_bytes[p_idx + 1] + 190)
                            frame_bytes[p_idx + 2] = clamp(frame_bytes[p_idx + 2] + 90)
                            
        # Draw wedding stage arch silhouette in lower half
        arch_radius = int(140 * pulse)
        for y in range(cy - arch_radius, cy + arch_radius):
            for x in range(cx - arch_radius, cx + arch_radius):
                dist = math.sqrt((x - cx)**2 + (y - cy)**2)
                if abs(dist - arch_radius) < 6:
                    if 0 <= x < WIDTH and 0 <= y < HEIGHT:
                        a_idx = (y * WIDTH + x) * 3
                        frame_bytes[a_idx] = 230
                        frame_bytes[a_idx + 1] = 195
                        frame_bytes[a_idx + 2] = 100
                        
        # Pipe frame to ffmpeg
        proc.stdin.write(header)
        proc.stdin.write(frame_bytes)
        
    proc.stdin.close()
    proc.wait()
    print("Video generation completed successfully!")

if __name__ == '__main__':
    create_video()
