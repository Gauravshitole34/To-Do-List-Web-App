class TaskManager {
    constructor() {
        // Initialize with sample data
        this.tasks = [
            {
                id: 1,
                title: "Complete project documentation",
                description: "Write comprehensive documentation for the new feature",
                priority: "high",
                category: "work",
                completed: false,
                createdAt: "2025-08-17T09:00:00.000Z",
                completedAt: null,
                order: 1
            },
            {
                id: 2,
                title: "Buy groceries",
                description: "Milk, bread, eggs, vegetables",
                priority: "medium",
                category: "personal",
                completed: false,
                createdAt: "2025-08-17T08:30:00.000Z",
                completedAt: null,
                order: 2
            },
            {
                id: 3,
                title: "Call dentist",
                description: "Schedule appointment for next week",
                priority: "low",
                category: "health",
                completed: true,
                createdAt: "2025-08-16T15:00:00.000Z",
                completedAt: "2025-08-17T09:15:00.000Z",
                order: 3
            }
        ];
        
        this.nextId = 4;
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.selectedTasks = new Set();
        this.draggedTask = null;
        this.editingTaskId = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
        this.updateProgress();
        this.setupKeyboardShortcuts();
    }
    
    bindEvents() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', this.toggleTheme.bind(this));
        
        // Task form
        document.getElementById('taskForm').addEventListener('submit', this.addTask.bind(this));
        
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });
        
        // Search
        document.getElementById('searchInput').addEventListener('input', this.handleSearch.bind(this));
        
        // Bulk actions
        document.getElementById('selectAllTasks').addEventListener('click', this.selectAllTasks.bind(this));
        document.getElementById('bulkComplete').addEventListener('click', this.bulkCompleteSelected.bind(this));
        document.getElementById('bulkDelete').addEventListener('click', this.bulkDeleteSelected.bind(this));
        
        // Export
        document.getElementById('exportTasks').addEventListener('click', this.exportTasks.bind(this));
        
        // Modal
        document.getElementById('cancelDelete').addEventListener('click', this.hideDeleteModal.bind(this));
        document.getElementById('confirmDelete').addEventListener('click', this.confirmDelete.bind(this));
        
        // Toast close
        document.querySelector('.toast-close').addEventListener('click', this.hideToast.bind(this));
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Enter to add task
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                const form = document.getElementById('taskForm');
                if (document.activeElement.closest('form') === form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
            
            // Delete key to delete selected tasks
            if (e.key === 'Delete' && this.selectedTasks.size > 0) {
                e.preventDefault();
                this.bulkDeleteSelected();
            }
            
            // Escape to close modal or clear search
            if (e.key === 'Escape') {
                if (!document.getElementById('deleteModal').classList.contains('hidden')) {
                    this.hideDeleteModal();
                } else if (this.searchTerm) {
                    document.getElementById('searchInput').value = '';
                    this.handleSearch({ target: { value: '' } });
                }
            }
        });
    }
    
    addTask(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const priority = document.getElementById('taskPriority').value;
        const category = document.getElementById('taskCategory').value;
        
        if (!title) {
            this.showToast('Please enter a task title', 'error');
            return;
        }
        
        const newTask = {
            id: this.nextId++,
            title,
            description,
            priority,
            category,
            completed: false,
            createdAt: new Date().toISOString(),
            completedAt: null,
            order: this.tasks.length + 1
        };
        
        this.tasks.push(newTask);
        form.reset();
        
        this.render();
        this.updateStats();
        this.updateProgress();
        this.showToast('Task added successfully!', 'success');
    }
    
    toggleTaskComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toISOString() : null;
            
            this.render();
            this.updateStats();
            this.updateProgress();
            
            const message = task.completed ? 'Task marked as completed!' : 'Task marked as pending!';
            this.showToast(message, 'success');
        }
    }
    
    editTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        this.editingTaskId = taskId;
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const titleElement = taskElement.querySelector('.task-title');
        const descriptionElement = taskElement.querySelector('.task-description');
        
        // Create edit form
        titleElement.innerHTML = `<input type="text" class="form-control edit-title" value="${task.title}" style="margin-bottom: 8px;">`;
        descriptionElement.innerHTML = `<textarea class="form-control edit-description" rows="2">${task.description}</textarea>`;
        
        // Add save/cancel buttons
        const actionsContainer = taskElement.querySelector('.task-actions');
        actionsContainer.innerHTML = `
            <button class="task-action-btn save" onclick="taskManager.saveTask(${taskId})">
                <i class="fas fa-check"></i>
            </button>
            <button class="task-action-btn cancel" onclick="taskManager.cancelEdit()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Focus on title input
        taskElement.querySelector('.edit-title').focus();
    }
    
    saveTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const newTitle = taskElement.querySelector('.edit-title').value.trim();
        const newDescription = taskElement.querySelector('.edit-description').value.trim();
        
        if (!newTitle) {
            this.showToast('Task title cannot be empty', 'error');
            return;
        }
        
        task.title = newTitle;
        task.description = newDescription;
        this.editingTaskId = null;
        
        this.render();
        this.showToast('Task updated successfully!', 'success');
    }
    
    cancelEdit() {
        this.editingTaskId = null;
        this.render();
    }
    
    deleteTask(taskId) {
        this.taskToDelete = taskId;
        this.showDeleteModal();
    }
    
    confirmDelete() {
        if (this.taskToDelete) {
            this.tasks = this.tasks.filter(t => t.id !== this.taskToDelete);
            this.selectedTasks.delete(this.taskToDelete);
            
            this.render();
            this.updateStats();
            this.updateProgress();
            this.hideDeleteModal();
            this.showToast('Task deleted successfully!', 'success');
            
            this.taskToDelete = null;
        }
    }
    
    toggleTaskSelection(taskId) {
        if (this.selectedTasks.has(taskId)) {
            this.selectedTasks.delete(taskId);
        } else {
            this.selectedTasks.add(taskId);
        }
        
        this.render();
        this.updateBulkActionButtons();
    }
    
    selectAllTasks() {
        const visibleTasks = this.getFilteredTasks();
        const allSelected = visibleTasks.every(task => this.selectedTasks.has(task.id));
        
        if (allSelected) {
            visibleTasks.forEach(task => this.selectedTasks.delete(task.id));
        } else {
            visibleTasks.forEach(task => this.selectedTasks.add(task.id));
        }
        
        this.render();
        this.updateBulkActionButtons();
    }
    
    bulkCompleteSelected() {
        const selectedTasksArray = Array.from(this.selectedTasks);
        selectedTasksArray.forEach(taskId => {
            const task = this.tasks.find(t => t.id === taskId);
            if (task && !task.completed) {
                task.completed = true;
                task.completedAt = new Date().toISOString();
            }
        });
        
        this.selectedTasks.clear();
        this.render();
        this.updateStats();
        this.updateProgress();
        this.updateBulkActionButtons();
        this.showToast(`${selectedTasksArray.length} tasks completed!`, 'success');
    }
    
    bulkDeleteSelected() {
        const selectedTasksArray = Array.from(this.selectedTasks);
        this.tasks = this.tasks.filter(t => !this.selectedTasks.has(t.id));
        this.selectedTasks.clear();
        
        this.render();
        this.updateStats();
        this.updateProgress();
        this.updateBulkActionButtons();
        this.showToast(`${selectedTasksArray.length} tasks deleted!`, 'success');
    }
    
    updateBulkActionButtons() {
        const hasSelection = this.selectedTasks.size > 0;
        const bulkCompleteBtn = document.getElementById('bulkComplete');
        const bulkDeleteBtn = document.getElementById('bulkDelete');
        const selectAllBtn = document.getElementById('selectAllTasks');
        
        bulkCompleteBtn.disabled = !hasSelection;
        bulkDeleteBtn.disabled = !hasSelection;
        
        const visibleTasks = this.getFilteredTasks();
        const allSelected = visibleTasks.length > 0 && visibleTasks.every(task => this.selectedTasks.has(task.id));
        selectAllBtn.innerHTML = allSelected 
            ? '<i class="fas fa-square"></i> Deselect All'
            : '<i class="fas fa-check-square"></i> Select All';
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }
    
    handleSearch(e) {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.render();
    }
    
    getFilteredTasks() {
        let filteredTasks = [...this.tasks];
        
        // Apply status filter
        switch (this.currentFilter) {
            case 'pending':
                filteredTasks = filteredTasks.filter(task => !task.completed);
                break;
            case 'completed':
                filteredTasks = filteredTasks.filter(task => task.completed);
                break;
            case 'high':
                filteredTasks = filteredTasks.filter(task => task.priority === 'high');
                break;
        }
        
        // Apply search filter
        if (this.searchTerm) {
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(this.searchTerm) ||
                task.description.toLowerCase().includes(this.searchTerm) ||
                task.category.toLowerCase().includes(this.searchTerm)
            );
        }
        
        // Sort by order
        return filteredTasks.sort((a, b) => a.order - b.order);
    }
    
    render() {
        const tasksList = document.getElementById('tasksList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list empty-icon"></i>
                    <h3 class="empty-title">No tasks found</h3>
                    <p class="empty-description">${this.searchTerm ? 'Try adjusting your search criteria.' : 'Add your first task to get started!'}</p>
                </div>
            `;
            return;
        }
        
        tasksList.innerHTML = filteredTasks.map(task => this.renderTask(task)).join('');
        this.updateBulkActionButtons();
        this.setupDragAndDrop();
    }
    
    renderTask(task) {
        const createdDate = new Date(task.createdAt).toLocaleDateString();
        const completedDate = task.completedAt ? new Date(task.completedAt).toLocaleDateString() : '';
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${this.selectedTasks.has(task.id) ? 'selected' : ''}" 
                 data-task-id="${task.id}" draggable="true">
                <div class="task-select ${this.selectedTasks.has(task.id) ? 'selected' : ''}" 
                     onclick="taskManager.toggleTaskSelection(${task.id})">
                    ${this.selectedTasks.has(task.id) ? '<i class="fas fa-check"></i>' : ''}
                </div>
                
                <div class="task-header">
                    <div class="task-left">
                        <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                             onclick="taskManager.toggleTaskComplete(${task.id})">
                            ${task.completed ? '<i class="fas fa-check"></i>' : ''}
                        </div>
                        <div class="task-content">
                            <div class="task-title">${task.title}</div>
                            <div class="task-description">${task.description || ''}</div>
                            <div class="task-meta">
                                <span class="task-priority ${task.priority}">${task.priority}</span>
                                <span class="task-category">${task.category}</span>
                                <span class="task-date">Created: ${createdDate}</span>
                                ${completedDate ? `<span class="task-date">Completed: ${completedDate}</span>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-action-btn edit" onclick="taskManager.editTask(${task.id})" 
                                ${task.completed ? 'disabled' : ''}>
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-action-btn delete" onclick="taskManager.deleteTask(${task.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    setupDragAndDrop() {
        const taskItems = document.querySelectorAll('.task-item');
        
        taskItems.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));
            item.addEventListener('dragover', this.handleDragOver.bind(this));
            item.addEventListener('drop', this.handleDrop.bind(this));
        });
    }
    
    handleDragStart(e) {
        this.draggedTask = parseInt(e.currentTarget.dataset.taskId);
        e.currentTarget.classList.add('dragging');
    }
    
    handleDragEnd(e) {
        e.currentTarget.classList.remove('dragging');
        this.draggedTask = null;
    }
    
    handleDragOver(e) {
        e.preventDefault();
    }
    
    handleDrop(e) {
        e.preventDefault();
        
        if (!this.draggedTask) return;
        
        const targetTaskId = parseInt(e.currentTarget.dataset.taskId);
        if (this.draggedTask === targetTaskId) return;
        
        const draggedTaskIndex = this.tasks.findIndex(t => t.id === this.draggedTask);
        const targetTaskIndex = this.tasks.findIndex(t => t.id === targetTaskId);
        
        if (draggedTaskIndex === -1 || targetTaskIndex === -1) return;
        
        // Reorder tasks
        const [draggedTask] = this.tasks.splice(draggedTaskIndex, 1);
        this.tasks.splice(targetTaskIndex, 0, draggedTask);
        
        // Update order property
        this.tasks.forEach((task, index) => {
            task.order = index + 1;
        });
        
        this.render();
        this.showToast('Task reordered!', 'success');
    }
    
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('completedTasks').textContent = completed;
    }
    
    updateProgress() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        document.getElementById('progressFill').style.width = `${percentage}%`;
        document.getElementById('progressPercentage').textContent = `${percentage}%`;
    }
    
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showToast('Tasks exported successfully!', 'success');
    }
    
    toggleTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        const currentScheme = html.getAttribute('data-color-scheme');
        const newScheme = currentScheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-color-scheme', newScheme);
        themeToggle.innerHTML = newScheme === 'light' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
        
        this.showToast(`Switched to ${newScheme} theme`, 'success');
    }
    
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const icon = toast.querySelector('.toast-icon');
        const messageEl = toast.querySelector('.toast-message');
        
        // Set content
        messageEl.textContent = message;
        
        // Set icon and class
        toast.className = `toast ${type}`;
        switch (type) {
            case 'success':
                icon.className = 'toast-icon fas fa-check-circle';
                break;
            case 'error':
                icon.className = 'toast-icon fas fa-exclamation-circle';
                break;
            case 'warning':
                icon.className = 'toast-icon fas fa-exclamation-triangle';
                break;
        }
        
        // Show toast
        toast.classList.remove('hidden');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.hideToast();
        }, 3000);
    }
    
    hideToast() {
        document.getElementById('toast').classList.add('hidden');
    }
    
    showDeleteModal() {
        document.getElementById('deleteModal').classList.remove('hidden');
    }
    
    hideDeleteModal() {
        document.getElementById('deleteModal').classList.add('hidden');
        this.taskToDelete = null;
    }
}

// Initialize the application
const taskManager = new TaskManager();

// Make taskManager globally available for onclick handlers
window.taskManager = taskManager;