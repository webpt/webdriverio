"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getElementComputedRole({ elementId }) {
    const page = this.getPageHandle(true);
    const elementHandle = await this.elementStore.get(elementId);
    const snapshot = await page.accessibility.snapshot({
        root: elementHandle
    });
    if (!snapshot) {
        return 'Ignored';
    }
    return snapshot.role;
}
exports.default = getElementComputedRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RWxlbWVudENvbXB1dGVkUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9nZXRFbGVtZW50Q29tcHV0ZWRSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBVWUsS0FBSyxVQUFVLHNCQUFzQixDQUVoRCxFQUFFLFNBQVMsRUFBeUI7SUFFcEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzVELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDL0MsSUFBSSxFQUFFLGFBQWE7S0FDdEIsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNYLE9BQU8sU0FBUyxDQUFBO0tBQ25CO0lBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFBO0FBQ3hCLENBQUM7QUFmRCx5Q0FlQyJ9