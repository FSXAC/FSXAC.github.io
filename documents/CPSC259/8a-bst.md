---
title: Binary Search Trees
author: Muchen He
date: 2017-10-31
---

- toc
{:toc}


## Node

The typical structure for a node in a binary search tree contains the content, and its left and right pointers.

```c
struct BNode {
  	int item;
  	struct BNode * left;
  	struct BNode * right;
}

typedef struct BNode node_t;
```

## Building BST

To create a binary search tree, we first must make a **root** node. If there are no children - meaning that if there is only item in the BST, then that node will have no children. Thus it will have null pointers for its children.

```c
node_t* make_tree(int item) {
  	return make_node(item, NULL, NULL);
}
```

In general, we would have a function that creates a node on the heap, then returns the pointer to the node.

```c
node_t* make_node(int item, node_t* left_child, node_t* right_child) {
  
  	// First create a pointer of the new node
  	node_t* new_node;
  	
  	// Allocate new memory for the new node
  	new_node = (node_t*) malloc(sizeof(node_t));
  
  	// Asign values
  	new_node->item = item;
  	new_node->left = left_child;
  	new_node->right = right_child;
  
  	return new_node;
}
```

### Adding Nodes

To add a new item, we first traverse from the root down to find an appropriate parent node. This is done by comparing the left children or the right children of the current node. The function below is a recursive implementation, the complexity for adding nodes is $\mathbb O(\log n)$. 

```c
void add_node(node_t* root, int item) {
    // If the item we want to add is less than the root, go left
    // Else, go right
    if (item < root->item) {
    
        // Check if current node is a "leaf" node
        if (root->left)
            addNode(root->left, item);
        else
            root->left = makeNode(item, NULL, NULL);
    } else {
        if (root->right)
            addNode(root->right, item);
        else
            root->right = makeNode(item, NULL, NULL);
    }
}
```

## Accessing BST

### Finding Nodes

Finding a node is as simple as binary search. The complexity is $\mathbb O(\log n)$.

```c
node_t* find_node(node_t* root, int item) {
    if (root == NULL)
        return NULL;
  
    if (root->item == item)
        return root;
  
    if (item < root->item)
        return find_node(root->left, item);
    else
        return find_node(root->right, item);
}
```

### Finding Parent of Nodes

Since we can't find the parent just with the pointer to the child, we need to find it top down (from the root) until we have a match. The complexity is $\mathbb O(\log n)$.

```c
node_t* find_parent(node_t* root, int item) {
    if (root == NULL)
        return NULL;
  
    if (root->item == item)
        return NULL;
  
    if (root->left && (root->left->item == item))
        return root;
    
    if (root->right && (root->right->item == item))
        return root;
  
    if (item < root->item)
        return find_parent(root->left, item);
    else
        return find_parent(root->right, item);
}
```



## Destroying BST

### Deleting Nodes

There are several conditions to check for when deleting a node. First in order to delete a node, we must check if the node exists in the BST. 

Next, get the node's parent, since we need to set parent's pointer to the children to null. 

Last, free memory.

```c
node_t* delete_node(node_t* root, int item) {
    node_t* parent = NULL;
    node_t* target = find_node(root, item);
  	
  	// if node we're trying to delete doesn't exist
    if (target == NULL) {
        return root;  
    }
  
    // get parent
    parent = find_parent(root, item);
```

If the node has no children, then the code would be:

```c
    if (parent == NULL) {
        // If current node has no parent, nor children (BST of 1 element)
        root = NULL;
    } else {
        // If the current node has a parent
        if (parent->left == target)
            parent->left = target->left;
        else
            parent->right = target->right;
    }
```

Notice that in the last `else` statement, we didn't need to check if parent's right child pointer equals to target. This is because `find_parent` returns a valid parent. So if left child isn't the target, then the right child must be.

Lastly, we free the memory, and return the root pointer, where it has now deleted the node.

```c
    free(target);
    return root;
}
```

