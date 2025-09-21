document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.tab-button');
    const notificationCards = document.querySelectorAll('.notification-card');
    const markAllReadBtn = document.querySelector('.mark-all-read-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter notifications
            const filter = this.dataset.filter;
            notificationCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (filter === 'unread') {
                    card.style.display = card.classList.contains('unread') ? 'block' : 'none';
                } else if (filter === 'archived') {
                    card.style.display = 'none'; // No archived notifications in demo
                }
            });
        });
    });

    // Mark as read functionality
    const markReadButtons = document.querySelectorAll('.mark-read-btn');
    markReadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.notification-card');
            card.classList.remove('unread');
            
            // Update unread count
            updateUnreadCount();
            
            // Change button text
            this.textContent = 'Mark Unread';
            this.classList.remove('mark-read-btn');
            this.classList.add('mark-unread-btn');
            
            // Add mark unread functionality
            this.addEventListener('click', function() {
                card.classList.add('unread');
                this.textContent = 'Mark as Read';
                this.classList.remove('mark-unread-btn');
                this.classList.add('mark-read-btn');
                updateUnreadCount();
            });
        });
    });

    // Mark all as read
    markAllReadBtn.addEventListener('click', function() {
        notificationCards.forEach(card => {
            if (card.classList.contains('unread')) {
                card.classList.remove('unread');
                
                // Update buttons in each card
                const markReadBtn = card.querySelector('.mark-read-btn');
                if (markReadBtn) {
                    markReadBtn.textContent = 'Mark Unread';
                    markReadBtn.classList.remove('mark-read-btn');
                    markReadBtn.classList.add('mark-unread-btn');
                    
                    // Add mark unread functionality
                    markReadBtn.addEventListener('click', function() {
                        card.classList.add('unread');
                        this.textContent = 'Mark as Read';
                        this.classList.remove('mark-unread-btn');
                        this.classList.add('mark-read-btn');
                        updateUnreadCount();
                    });
                }
            }
        });
        
        updateUnreadCount();
    });

    // Dismiss functionality
    const dismissButtons = document.querySelectorAll('.dismiss-btn');
    dismissButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.notification-card');
            card.style.opacity = '0';
            setTimeout(() => {
                card.remove();
                updateUnreadCount();
            }, 300);
        });
    });

    // View test functionality (demo)
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Opening test details... (Demo)');
        });
    });

    function updateUnreadCount() {
        const unreadCount = document.querySelectorAll('.notification-card.unread').length;
        const unreadTab = document.querySelector('[data-filter="unread"] .tab-count');
        if (unreadTab) {
            unreadTab.textContent = unreadCount;
            if (unreadCount === 0) {
                unreadTab.style.display = 'none';
            } else {
                unreadTab.style.display = 'inline';
            }
        }

        // Update sidebar badge
        const sidebarBadge = document.querySelector('.notification-badge');
        if (sidebarBadge) {
            sidebarBadge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    // Initial count update
    updateUnreadCount();

    // Auto-dismiss old notifications after 10 seconds (demo)
    setTimeout(() => {
        const oldNotifications = document.querySelectorAll('.notification-card.read');
        oldNotifications.forEach(card => {
            if (Math.random() > 0.5) { // Randomly dismiss some
                card.style.opacity = '0';
                setTimeout(() => card.remove(), 300);
            }
        });
        updateUnreadCount();
    }, 10000);
});