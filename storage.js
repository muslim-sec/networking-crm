let fileHandle = null;

export async function openFile() {
    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [
                {
                    description: 'JSON Files',
                    accept: {
                        'application/json': ['.json'],
                    },
                },
            ],
            multiple: false
        });
        return await readFile();
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Error opening file:', err);
            throw err;
        }
        return null;
    }
}

export async function readFile() {
    if (!fileHandle) return null;
    
    if (await verifyPermission(fileHandle) === false) {
        throw new Error('Permission denied');
    }
    
    const file = await fileHandle.getFile();
    const text = await file.text();
    return JSON.parse(text);
}

export async function saveFile(data) {
    if (!fileHandle) throw new Error('No file open');
    
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(data, null, 2));
    await writable.close();
}

async function verifyPermission(fileHandle, readWrite = true) {
    const options = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }
    
    if ((await fileHandle.queryPermission(options)) === 'granted') {
        return true;
    }
    
    if ((await fileHandle.requestPermission(options)) === 'granted') {
        return true;
    }
    return false;
}
