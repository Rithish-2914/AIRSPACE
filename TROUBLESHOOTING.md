# 🔧 AIRSPACE Troubleshooting Guide

Common issues and solutions for AIRSPACE.

---

## 📹 Camera Issues

### Camera Not Working / Permission Denied

**Symptoms:**
- No webcam feed visible
- Browser shows "Permission denied" error
- Black screen where camera should be

**Solutions:**

1. **Check Browser Permissions**
   - Click the 🔒 lock icon in address bar
   - Set Camera to "Allow"
   - Refresh the page (Ctrl+R or Cmd+R)

2. **Browser-Specific Fixes**
   
   **Chrome/Edge:**
   - Go to `chrome://settings/content/camera`
   - Find your site in "Allowed" list
   - If blocked, remove from "Blocked" and reload
   
   **Firefox:**
   - Go to `about:preferences#privacy`
   - Scroll to Permissions → Camera
   - Click "Settings" and allow your site
   
   **Safari:**
   - Safari → Settings → Websites → Camera
   - Find your site and set to "Allow"

3. **Check Other Apps**
   - Close Zoom, Teams, Skype (they may lock camera)
   - Check if other apps can access camera
   - Restart browser completely

4. **Operating System Permissions**
   
   **Windows 10/11:**
   - Settings → Privacy → Camera
   - Enable "Allow apps to access camera"
   - Enable for your browser specifically
   
   **macOS:**
   - System Settings → Privacy & Security → Camera
   - Check the box next to your browser
   
   **Linux:**
   - Check `/dev/video0` exists: `ls /dev/video*`
   - Ensure user is in `video` group: `groups`

---

## 🖐️ Hand Tracking Issues

### Hand Not Detected / No Green Dots

**Symptoms:**
- No green dots appear on hands
- Console shows "Hand tracking not initialized"
- Red error in corner

**Solutions:**

1. **Lighting Issues**
   - Add more light (turn on lamps/overhead lights)
   - Avoid backlighting (don't sit in front of window)
   - Use front-facing lighting
   - Ensure face AND hands are well-lit

2. **Background Issues**
   - Use plain, solid-color background
   - Avoid busy patterns or posters
   - Move away from cluttered areas
   - Sit against a wall if possible

3. **Distance & Position**
   - Sit 2-3 feet from camera (60-90 cm)
   - Keep full hand in frame
   - Try moving closer or farther
   - Ensure camera is at chest/face height

4. **Hand Visibility**
   - Remove gloves
   - Wash hands (dirt can affect tracking)
   - Avoid very light or very dark skin tones in low light
   - Keep fingers spread and visible

5. **Technical Checks**
   - Open browser console (F12)
   - Look for MediaPipe errors
   - Check internet connection (MediaPipe loads from CDN)
   - Clear browser cache (Ctrl+Shift+Delete)

### Tracking Laggy / Stuttering

**Symptoms:**
- Delayed hand tracking
- Cursor jumps around
- Frame rate drops

**Solutions:**

1. **Browser Performance**
   - Close unnecessary tabs (keep only AIRSPACE open)
   - Disable browser extensions temporarily
   - Use Chrome or Edge (best MediaPipe support)
   - Restart browser

2. **System Resources**
   - Close other applications
   - Check Task Manager / Activity Monitor
   - Ensure CPU isn't maxed out
   - Close video calls or streaming

3. **Camera Settings**
   - Lower camera resolution if possible
   - Check camera drivers are updated
   - Try different USB port (if external camera)
   - Disable camera effects/filters in other apps

4. **Network**
   - Ensure stable internet (for CDN resources)
   - Disable VPN temporarily (if enabled)
   - Check browser isn't downloading in background

---

## ✋ Gesture Recognition Issues

### Gestures Not Responding

**Symptoms:**
- Pinch doesn't click
- Fist doesn't grab
- Swipe doesn't register

**Solutions:**

1. **Gesture Technique**
   - Hold gestures for FULL 0.5-1 second
   - Make movements bigger and more obvious
   - Try the other hand
   - Exaggerate finger positions

2. **Pinch Not Working**
   - Touch fingertips together (not just close)
   - Press thumb and index harder
   - Make sure camera sees both fingers clearly
   - Try different angle

3. **Fist Not Grabbing**
   - Close ALL fingers completely
   - Tuck thumb in
   - Hold fist steady for 0.5s before moving
   - Keep fist closed while dragging

4. **Point Cursor Jumping**
   - Extend index finger fully straight
   - Close other fingers tightly
   - Hold hand more steady
   - Move slower

5. **Swipe Not Detected**
   - Move faster (it's a swipe, not a slide!)
   - Cover more distance (6+ inches)
   - Keep hand in frame during motion
   - Try more exaggerated motion

### Accidental Gestures / False Positives

**Symptoms:**
- Menu opens randomly
- Clicks happen without intending
- Windows move unexpectedly

**Solutions:**

1. **Keep Second Hand Out of Frame**
   - Only use one hand in camera view
   - Rest other hand in lap or out of sight
   - Don't gesture while talking

2. **Be Deliberate**
   - Pause between gestures
   - Don't make random hand movements
   - Hold gestures intentionally
   - Practice controlled movements

3. **Adjust Sensitivity**
   - Edit `client/src/lib/gestures.ts`
   - Increase `PINCH_THRESHOLD` (harder to pinch)
   - Increase `SWIPE_THRESHOLD` (harder to swipe)
   - Increase `GESTURE_HOLD_TIME` (longer hold required)

---

## 🪟 Window & App Issues

### App Won't Open

**Symptoms:**
- Pinching icon does nothing
- No window appears
- Error in console

**Solutions:**

1. **Pinch Technique**
   - Point directly at icon center
   - Hold pinch for FULL 1 second
   - Make sure cursor is over icon
   - Try clicking with mouse to test

2. **Browser Issues**
   - Refresh page (Ctrl+R)
   - Hard refresh (Ctrl+Shift+R)
   - Clear cache and reload
   - Try incognito/private mode

3. **Console Errors**
   - Press F12 to open developer tools
   - Check Console tab for red errors
   - Copy error message for debugging
   - Report issue with error details

### Window Stuck / Can't Move

**Symptoms:**
- Window won't drag
- Stuck in corner
- Can't resize

**Solutions:**

1. **Drag Technique**
   - Point at title bar (top of window)
   - Make fist gesture
   - Hold fist steady for 0.5s
   - Then move hand slowly
   - Release fist to drop

2. **Reset Window**
   - Close window and reopen
   - Refresh entire page
   - Window should reappear in default position

3. **Browser Zoom**
   - Reset zoom to 100% (Ctrl+0)
   - Window positions can break at weird zooms

### Multiple Windows Overlapping

**Symptoms:**
- Can't see window underneath
- Windows stack on top of each other

**Solutions:**

1. **Click to Focus**
   - Pinch anywhere on a window to bring to front
   - Windows auto-stack by last used

2. **Minimize Others**
   - Minimize windows you're not using
   - Click minimize button (― in top-right)

3. **Reorganize**
   - Drag windows to different positions
   - Spread them around the screen

---

## 🎨 App-Specific Issues

### Sketch Pad: Can't Draw

**Solution:**
- Make FIST gesture (not point)
- Hold fist while moving to draw
- Pinch to change colors first
- Check brush size isn't zero

### Calculator: Numbers Wrong

**Solution:**
- Ensure pinch is accurate on buttons
- Wait for button highlight before releasing
- Try clicking with mouse to verify app works

### Air Builder: Can't Create 3D Objects

**Solution:**
- Pinch the shape buttons (cube, sphere, etc.)
- Objects appear at center
- May be behind camera initially
- Try creating multiple objects

### AI Assistant: "Service Not Configured"

**Solution:**
- AI requires `OPENAI_API_KEY` environment variable
- Not available in basic Vercel deployment
- Works on Replit or custom backend
- Check README for API key setup

### Browser App: Site Won't Load

**Solution:**
- Some sites block iframes (CORS)
- Try different URL
- Use direct navigation only

---

## 🚀 Performance Issues

### App Slow / Laggy

**Symptoms:**
- Everything responds slowly
- UI feels sluggish
- High CPU usage

**Solutions:**

1. **Browser Optimization**
   ```
   - Close all other tabs
   - Disable extensions (especially ad blockers)
   - Clear browser cache
   - Restart browser
   - Use Chrome or Edge
   ```

2. **System Optimization**
   ```
   - Close other applications
   - Check CPU/RAM usage
   - Restart computer if needed
   - Ensure not overheating
   ```

3. **Network**
   ```
   - Check internet speed (for CDN resources)
   - Disable VPN if enabled
   - Use wired connection if possible
   ```

### Page Won't Load / Crashes

**Solutions:**

1. **Hard Refresh**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Everything**
   ```
   - Clear browser cache: Ctrl+Shift+Delete
   - Clear cookies for site
   - Close all tabs
   - Restart browser
   ```

3. **Browser Issues**
   ```
   - Update browser to latest version
   - Try different browser (Chrome recommended)
   - Try incognito/private mode
   - Disable all extensions
   ```

---

## 🌐 Deployment Issues

### Vercel Build Fails

**Error:** `Build failed`

**Solutions:**
1. Check build locally: `npm run build`
2. Ensure all dependencies in package.json
3. Check Vercel build logs for specific error
4. Verify Node.js version compatibility

### Vercel: API Routes Return 404

**Error:** `404 - NOT FOUND` for `/api/*`

**Solutions:**
1. Ensure `vercel.json` exists
2. Check `api/index.js` exists
3. Verify rewrites are configured
4. Redeploy project

### Environment Variables Not Working

**Error:** API key errors, database connection fails

**Solutions:**
1. Add variables in Vercel Dashboard
2. Go to: Project → Settings → Environment Variables
3. Add: `OPENAI_API_KEY`, `DATABASE_URL`, etc.
4. **Important**: Redeploy after adding variables!

---

## 🆘 Getting Help

### Check Logs

**Browser Console:**
```
1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. Look for red errors
4. Copy error messages
```

**Network Tab:**
```
1. F12 → Network tab
2. Refresh page
3. Look for failed requests (red)
4. Check 404 or 500 errors
```

### Report Issue

When reporting issues, include:

1. **Browser & Version** (Chrome 120, Firefox 115, etc.)
2. **Operating System** (Windows 11, macOS 14, Ubuntu 22.04)
3. **Error Message** (copy from console)
4. **Steps to Reproduce** (what you did before error)
5. **Screenshots** (if visual issue)

### Still Stuck?

- Check [README.md](./README.md) for full documentation
- Review [QUICK-START.md](./QUICK-START.md) for basics
- Check [GESTURE-REFERENCE.md](./GESTURE-REFERENCE.md) for gestures
- See [README-VERCEL.md](./README-VERCEL.md) for deployment

---

## 🔄 Reset Everything

**Nuclear Option** - When nothing else works:

1. **Clear Browser Completely**
   ```
   - Ctrl+Shift+Delete (or Cmd+Shift+Delete)
   - Select "All time"
   - Check all boxes
   - Clear data
   ```

2. **Reset Camera Permissions**
   ```
   - Browser settings → Privacy → Camera
   - Remove site from allowed/blocked lists
   - Reload and allow again when prompted
   ```

3. **Fresh Start**
   ```
   - Close browser completely
   - Restart computer
   - Open browser
   - Navigate to AIRSPACE
   - Allow camera when prompted
   ```

---

**Most issues resolve with better lighting and holding gestures longer! 💡**
