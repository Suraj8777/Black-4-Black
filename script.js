// Handle form submission
document.getElementById('channel-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh
    
    const channelUrl = document.getElementById('channel-url').value.trim();
    
    if (channelUrl) {
        // Create list item for the submitted channel
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.href = channelUrl;
        link.textContent = channelUrl;
        link.target = '_blank'; // Open link in new tab
        link.rel = 'noopener noreferrer'; // Security best practice
        
        listItem.appendChild(link);
        document.getElementById('channel-list').appendChild(listItem);
        
        // Clear the input field
        document.getElementById('channel-url').value = '';
    }
});
