// Example JavaScript to show modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create a modal handler class to reduce repetitive code
    class ModalHandler {
        constructor(modalId, triggerSelector, closeSelector = '.modal-close') {
            this.modal = document.getElementById(modalId);
            this.triggers = document.querySelectorAll(triggerSelector);
            this.closeBtn = this.modal.querySelector(closeSelector);
            this.init();
        }

        init() {
            this.triggers.forEach(trigger => {
                trigger.addEventListener('click', () => this.open());
            });
            
            this.closeBtn.addEventListener('click', () => this.close());
            
            // Close when clicking outside
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });
        }

        open() {
            this.modal.classList.add('active');
        }

        close() {
            this.modal.classList.remove('active');
        }
    }

    // Initialize modals
    const deviceModal = new ModalHandler('deviceModal', '.inventory-item');
    const addDeviceModal = new ModalHandler('addDeviceModal', '#addDeviceBtn');
    const scheduleTrainingModal = new ModalHandler('scheduleTrainingModal', '#scheduleTrainingBtn');
    
    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    const inventoryGrid = document.querySelector('.inventory-grid');
    const tableView = document.querySelector('.table-view');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const viewType = this.getAttribute('data-view');
            if (viewType === 'grid') {
                inventoryGrid.style.display = 'grid';
                tableView.style.display = 'none';
            } else {
                inventoryGrid.style.display = 'none';
                tableView.style.display = 'block';
            }
        });
    });
    
    // Simplified sidebar handling
    const sidebarHandler = {
        elements: {
            toggle: document.getElementById('filterToggle'),
            sidebar: document.getElementById('filterSidebar'),
            overlay: document.getElementById('sidebarOverlay'),
            close: document.getElementById('sidebarClose')
        },
        
        toggleSidebar(show) {
            const action = show ? 'add' : 'remove';
            this.elements.sidebar.classList[action]('active');
            this.elements.overlay.classList[action]('active');
            document.body.style.overflow = show ? 'hidden' : '';
        },

        init() {
            this.elements.toggle.addEventListener('click', () => this.toggleSidebar(true));
            this.elements.close.addEventListener('click', () => this.toggleSidebar(false));
            this.elements.overlay.addEventListener('click', () => this.toggleSidebar(false));
        }
    };

    sidebarHandler.init();
    
    // Image Gallery Handler
    class ImageGalleryHandler {
        constructor(thumbnailSelector, mainImageSelector) {
            this.thumbnails = document.querySelectorAll(thumbnailSelector);
            this.mainImage = document.querySelector(mainImageSelector);
            this.init();
        }

        init() {
            this.thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => this.switchImage(thumb));
            });
        }

        switchImage(selectedThumb) {
            this.thumbnails.forEach(t => t.classList.remove('active'));
            selectedThumb.classList.add('active');
            
            const thumbImg = selectedThumb.querySelector('img');
            this.mainImage.src = thumbImg.src;
        }
    }

    // Tab Handler
    class TabHandler {
        constructor(tabSelector, contentSelector) {
            this.tabs = document.querySelectorAll(tabSelector);
            this.contents = document.querySelectorAll(contentSelector);
            this.init();
        }

        init() {
            this.tabs.forEach(tab => {
                tab.addEventListener('click', () => this.switchTab(tab));
            });
        }

        switchTab(selectedTab) {
            this.tabs.forEach(t => t.classList.remove('active'));
            selectedTab.classList.add('active');
            
            const tabName = selectedTab.textContent.trim().toLowerCase();
            this.contents.forEach(content => {
                content.style.display = 'none';
            });
            
            document.getElementById(`${tabName}Tab`).style.display = 'block';
        }
    }

    // Initialize handlers
    new ImageGalleryHandler('.device-thumbnail', '.device-main-image img');
    new TabHandler('.device-tab', '.tab-content');
    
    // Staff Selection Handler
    class StaffSelectionHandler {
        constructor(selectAllId = 'selectAll', checkboxSelector = '.staff-checkbox:not([disabled])') {
            this.selectAll = document.getElementById(selectAllId);
            this.checkboxes = document.querySelectorAll(checkboxSelector);
            
            if (this.selectAll && this.checkboxes.length > 0) {
                this.init();
            }
        }

        init() {
            this.selectAll.addEventListener('change', () => this.toggleAll());
            this.checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => this.updateSelectAllState());
            });
        }

        toggleAll() {
            this.checkboxes.forEach(checkbox => {
                checkbox.checked = this.selectAll.checked;
            });
        }

        updateSelectAllState() {
            const allChecked = Array.from(this.checkboxes).every(c => c.checked);
            this.selectAll.checked = allChecked;
        }
    }

    // Form Handler
    class FormHandler {
        constructor(formSelector = 'form') {
            this.forms = document.querySelectorAll(formSelector);
            this.init();
        }

        init() {
            this.forms.forEach(form => {
                form.addEventListener('submit', (e) => this.handleSubmit(e));
            });
        }

        handleSubmit(e) {
            e.preventDefault();
            // Add any form validation or submission logic here
            const form = e.target;
            console.log('Form submission prevented:', form.id || 'unnamed form');
        }
    }

    // Initialize handlers
    new StaffSelectionHandler();
    new FormHandler();
});