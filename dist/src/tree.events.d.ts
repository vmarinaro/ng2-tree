import { Tree } from './tree';
import { RenamableNode } from './tree.types';
export declare class NodeEvent {
  node: Tree;
  constructor(node: Tree);
}
export declare class NodeSelectedEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class NodeUnselectedEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class NodeDestructiveEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class NodeMovedEvent extends NodeDestructiveEvent {
  previousParent: Tree;
  constructor(node: Tree, previousParent: Tree);
}
export declare class NodeRemovedEvent extends NodeDestructiveEvent {
  lastIndex: number;
  constructor(node: Tree, lastIndex: number);
}
export declare class NodeCreatedEvent extends NodeDestructiveEvent {
  constructor(node: Tree);
}
export declare class NodeRenamedEvent extends NodeDestructiveEvent {
  oldValue: string | RenamableNode;
  newValue: string | RenamableNode;
  constructor(node: Tree, oldValue: string | RenamableNode, newValue: string | RenamableNode);
}
export declare class NodeExpandedEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class NodeCollapsedEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class MenuItemSelectedEvent extends NodeEvent {
  selectedItem: string;
  constructor(node: Tree, selectedItem: string);
}
export declare class LoadNextLevelEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class NodeCheckedEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class NodeUncheckedEvent extends NodeEvent {
  constructor(node: Tree);
}
export declare class NodeIndeterminedEvent extends NodeEvent {
  constructor(node: Tree);
}
