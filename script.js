// File management functions for all subject pages
document.addEventListener('DOMContentLoaded', function() {
    // Get subject from the current page
    const subject = window.location.pathname.split('/').pop().split('.')[0];
    
    // Initialize elements
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const noFilesMessage = document.getElementById('noFilesMessage');

    // Load files when page loads
    loadFiles();

    // Handle file upload
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const files = fileInput.files;
            if (files.length === 0) {
                alert('Please select at least one file to upload');
                return;
            }

            // Get existing files from localStorage
            let storedFiles = JSON.parse(localStorage.getItem(`subject_${subject}_files`)) || [];

            // Add new files
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    storedFiles.push({
                        id: Date.now() + i,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        lastModified: file.lastModified,
                        content: e.target.result.split(',')[1] // Store base64 content
                    });

                    // Save to localStorage
                    localStorage.setItem(`subject_${subject}_files`, JSON.stringify(storedFiles));
                    
                    // Refresh file list
                    loadFiles();
                };
                
                reader.readAsDataURL(file);
            }

            // Reset form
            fileInput.value = '';
        });
    }

    // Load and display files
    function loadFiles() {
        const files = JSON.parse(localStorage.getItem(`subject_${subject}_files`)) || [];
        
        if (files.length === 0) {
            if (noFilesMessage) noFilesMessage.style.display = 'block';
            if (fileList) fileList.innerHTML = '';
            return;
        }

        if (noFilesMessage) noFilesMessage.style.display = 'none';
        if (fileList) {
            fileList.innerHTML = '';

            files.forEach((file) => {
                const fileElement = document.createElement('div');
                fileElement.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2';
                
                const fileInfo = document.createElement('div');
                fileInfo.className = 'flex items-center';
                
                // File icon based on type
                const icon = document.createElement('i');
                if (file.type.startsWith('image/')) {
                    icon.className = 'fas fa-image text-blue-500 mr-3';
                } else if (file.type === 'application/pdf') {
                    icon.className = 'fas fa-file-pdf text-red-500 mr-3';
                } else if (file.type.startsWith('text/') || 
                          file.type === 'application/msword' || 
                          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    icon.className = 'fas fa-file-word text-blue-600 mr-3';
                } else {
                    icon.className = 'fas fa-file text-gray-500 mr-3';
                }
                
                const fileName = document.createElement('span');
                fileName.className = 'text-gray-800';
                fileName.textContent = file.name;
                
                const fileSize = document.createElement('span');
                fileSize.className = 'text-gray-500 text-sm ml-2';
                fileSize.textContent = formatFileSize(file.size);
                
                fileInfo.appendChild(icon);
                fileInfo.appendChild(fileName);
                fileInfo.appendChild(fileSize);
                
                const fileActions = document.createElement('div');
                fileActions.className = 'flex space-x-2';
                
                const downloadBtn = document.createElement('button');
                downloadBtn.className = 'text-blue-500 hover:text-blue-700';
                downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
                downloadBtn.addEventListener('click', () => downloadFile(file));
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'text-red-500 hover:text-red-700';
                deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
                deleteBtn.addEventListener('click', () => deleteFile(file.id));
                
                fileActions.appendChild(downloadBtn);
                fileActions.appendChild(deleteBtn);
                
                fileElement.appendChild(fileInfo);
                fileElement.appendChild(fileActions);
                
                fileList.appendChild(fileElement);
            });
        }
    }

    // Download file
    function downloadFile(file) {
        const link = document.createElement('a');
        link.href = `data:${file.type};base64,${file.content}`;
        link.download = file.name;
        link.click();
    }

    // Delete file
    function deleteFile(fileId) {
        if (confirm('Are you sure you want to delete this file?')) {
            let files = JSON.parse(localStorage.getItem(`subject_${subject}_files`)) || [];
            files = files.filter(file => file.id !== fileId);
            localStorage.setItem(`subject_${subject}_files`, JSON.stringify(files));
            loadFiles();
        }
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});