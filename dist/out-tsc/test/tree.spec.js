'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tree_1 = require('../src/tree');
var tree_types_1 = require('../src/tree.types');
var menu_events_1 = require('../src/menu/menu.events');
describe('Tree', function() {
  it('should detect empty string', function() {
    expect(tree_1.Tree.isValueEmpty('  ')).toBe(true);
    expect(tree_1.Tree.isValueEmpty(' \n \r ')).toBe(true);
    expect(tree_1.Tree.isValueEmpty('\r')).toBe(true);
    expect(tree_1.Tree.isValueEmpty(' \t ')).toBe(true);
    expect(tree_1.Tree.isValueEmpty('  ')).toBe(true);
    expect(tree_1.Tree.isValueEmpty('42')).toBe(false);
    expect(tree_1.Tree.isValueEmpty(' 42  \n')).toBe(false);
    expect(tree_1.Tree.isValueEmpty(' 42')).toBe(false);
    expect(tree_1.Tree.isValueEmpty('42 ')).toBe(false);
  });
  it('should be able to apply value to Renamable node', function() {
    var renamableNode = {
      name: '42',
      age: 'millions years',
      setName: function(value) {
        this.name = value;
      },
      toString: function() {
        return this.name;
      }
    };
    var tree = new tree_1.Tree({ value: renamableNode });
    tree.value = '12';
    expect(tree.value.toString()).toEqual('12');
    expect(tree.value.age).toEqual(renamableNode.age);
  });
  it('should be able to apply value to Renamable node: value might be another renamable node coerced to string', function() {
    var renamableNode = {
      name: '42',
      age: 'millions years',
      setName: function(value) {
        this.name = value;
      },
      toString: function() {
        return this.name;
      }
    };
    var tree = new tree_1.Tree({ value: renamableNode });
    tree.value = {
      setName: function() {},
      toString: function() {
        return 'Hi!';
      }
    };
    expect(tree.value.toString()).toEqual('Hi!');
  });
  it('should be able to apply value to regular node', function() {
    var tree = new tree_1.Tree({ value: 'bla' });
    tree.value = '12';
    expect(tree.value).toEqual('12');
  });
  it('assigns only RenamableNodes and strings as values', function() {
    var tree = new tree_1.Tree({ value: 'bla' });
    tree.value = ['boo!'];
    expect(tree.value).toEqual('bla');
  });
  it('should not apply value if it is empty', function() {
    var tree = new tree_1.Tree({ value: 'bla' });
    tree.value = '';
    expect(tree.value).toEqual('bla');
    tree.value = ' ';
    expect(tree.value).toEqual('bla');
    tree.value = ' \n\r\t';
    expect(tree.value).toEqual('bla');
  });
  it('should know how to detect Renamable node', function() {
    var renamableNode = {
      setName: function() {},
      toString: function() {}
    };
    var renamableNodeImposter = {
      setName: 42,
      toString: 'bla'
    };
    var regularNode = {
      value: 42
    };
    expect(tree_1.Tree.isRenamable(renamableNode)).toBe(true);
    expect(tree_1.Tree.isRenamable(renamableNodeImposter)).toBe(false);
    expect(tree_1.Tree.isRenamable(regularNode)).toBe(false);
  });
  it('should build a Tree from TreeModel', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' },
        {
          value: 'Slab serif',
          children: [{ value: 'Candida' }, { value: 'Swift' }, { value: 'Guardian Egyptian' }]
        }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    expect(tree).not.toBeFalsy('Constructed tree should exist');
    expect(tree instanceof tree_1.Tree).toBe(true, 'tree should be instance of Tree');
    expect(tree.value).toEqual(fonts.value);
    expect(tree.children.length).toEqual(6);
    expect(tree.children[0].value).toEqual('Antiqua');
    expect(tree.children[0].positionInParent).toEqual(0);
    var slabSerifFontsTree = tree.children[5];
    expect(slabSerifFontsTree.value).toEqual('Slab serif');
    expect(slabSerifFontsTree.children.length).toEqual(3);
    expect(slabSerifFontsTree.children[1].value).toEqual('Swift');
    expect(slabSerifFontsTree.children[1].positionInParent).toEqual(1);
  });
  it('should build a Tree with html as a value', function() {
    var tags = {
      value: '<a href="#">Awesome Tree</a>'
    };
    var tree = new tree_1.Tree(tags);
    expect(tree.value).toEqual(tags.value);
  });
  it('builds completely new structure from TreeModel and changes to TreeModel should not affect built Tree', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    fonts.children[0].value = 'bla';
    expect(fonts.children[0].value).toEqual('bla');
    expect(tree.children[0].value).toEqual('Antiqua');
  });
  it('merges TreeModelSettings during Tree construction from TreeModel', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    spyOn(tree_types_1.TreeModelSettings, 'merge');
    var tree = new tree_1.Tree(fonts);
    expect(tree_types_1.TreeModelSettings.merge).toHaveBeenCalledTimes(6);
    expect(tree_types_1.TreeModelSettings.merge).toHaveBeenCalledWith(fonts, undefined);
  });
  it('adds child', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    var child = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var addedChild = tree.addChild(child);
    expect(addedChild === child).toBe(false);
    expect(addedChild.positionInParent).toEqual(5);
    expect(addedChild.parent).toBe(tree);
  });
  it('adds child and shallowly clones its TreeModel', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    var child = new tree_1.Tree({ value: 'Master' });
    var addedChild = tree.addChild(child);
    addedChild.value = 'Boo!';
    expect(addedChild.value).toEqual('Boo!');
    expect(child.value).toEqual('Master');
  });
  it('has position which equals to -1 when does not have a parent', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    expect(tree.positionInParent).toEqual(-1);
  });
  it('has position which equals to -1 when still connected to parent but parent already does not have children', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    var child = tree.children[3];
    tree._children = null;
    expect(child.positionInParent).toEqual(-1);
  });
  it('has position which equals to actual position rendered', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    var child = tree.children[4];
    expect(child.positionInParent).toEqual(4);
  });
  it('adds child to a particular position in a tree', function() {
    var fonts = {
      value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
      children: [
        { value: 'Antiqua' },
        { value: 'DejaVu Serif' },
        { value: 'Garamond' },
        { value: 'Georgia' },
        { value: 'Times New Roman' }
      ]
    };
    var tree = new tree_1.Tree(fonts);
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var addedChild = tree.addChild(servantTree, 0);
    expect(tree.children.length).toEqual(6);
    expect(addedChild.positionInParent).toEqual(0);
    expect(tree.children[0].value).toEqual('Master');
  });
  it('adds child to tree with no children at creation moment', function() {
    var tree = new tree_1.Tree({
      value: 'Recipient'
    });
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var addedChild = tree.addChild(servantTree);
    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].value).toEqual('Master');
    expect(addedChild.positionInParent).toEqual(0);
    expect(addedChild.children.length).toEqual(2);
    expect(addedChild.children[1].value).toEqual('Servant#2');
  });
  it('adds child to tree with a not array children property', function() {
    var tree = new tree_1.Tree({
      value: 'Recipient',
      children: null
    });
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var addedChild = tree.addChild(servantTree);
    expect(tree.children.length).toEqual(1);
    expect(tree.children[0].value).toEqual('Master');
    expect(addedChild.positionInParent).toEqual(0);
    expect(addedChild.children.length).toEqual(2);
    expect(addedChild.children[1].value).toEqual('Servant#2');
  });
  it('cannot add sibling if there is no parent: root node', function() {
    var tree = new tree_1.Tree({
      value: 'Recipient',
      children: null
    });
    var addedSibling = tree.addSibling(new tree_1.Tree({ value: 'bla' }));
    expect(addedSibling).toBeNull();
    expect(tree.parent).toBeNull();
  });
  it('creates child node (leaf)', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var child = servantTree.createNode(false);
    expect(servantTree.hasChild(child)).toEqual(true);
    expect(child.value).toEqual('');
    expect(child.id).toBeDefined();
    expect(child.id).toEqual(jasmine.any(String));
    expect(child.children).toEqual(null);
    expect(child.isLeaf()).toEqual(true);
    expect(child.isNew()).toEqual(true);
    expect(child.positionInParent).toEqual(2);
  });
  it('cannot create child node when children are loaded async', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      loadChildren: function(callback) {
        setTimeout(function() {
          callback([{ value: 'Servant#1' }, { value: 'Servant#2' }]);
        }, 10);
      }
    });
    var child = servantTree.createNode(false);
    expect(child).toEqual(null);
    expect(servantTree.hasChild(child)).toEqual(false);
  });
  it('can create tree without any children', function() {
    var master = new tree_1.Tree({
      value: 'Master',
      children: []
    });
    expect(master.isRoot()).toEqual(true);
    expect(master.isBranch()).toEqual(true);
    expect(master.children).toEqual([]);
    expect(master.isLeaf()).toEqual(false);
    expect(master.isNodeExpanded()).toEqual(false);
    expect(master.isNodeCollapsed()).toEqual(false);
    expect(master.foldingType).toEqual(tree_types_1.FoldingType.Empty);
  });
  it('creating a child to a collapsed node, will expand it', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(servantTree.isNodeExpanded()).toEqual(true);
    expect(servantTree.isNodeCollapsed()).toEqual(false);
    servantTree.switchFoldingType();
    expect(servantTree.isNodeExpanded()).toEqual(false);
    expect(servantTree.isNodeCollapsed()).toEqual(true);
    var child = servantTree.createNode(true);
    expect(servantTree.isNodeExpanded()).toEqual(true);
    expect(servantTree.isNodeCollapsed()).toEqual(false);
    expect(servantTree.hasChild(child)).toEqual(true);
    expect(child.value).toEqual('');
    expect(child.children).toEqual([]);
    expect(child.isLeaf()).toEqual(false);
    expect(child.isNew()).toEqual(true);
    expect(child.positionInParent).toEqual(2);
  });
  it('creates sibling node (leaf)', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var servantNumber1Tree = servantTree.children[0];
    expect(servantNumber1Tree.value).toEqual('Servant#1');
    var sibling = servantNumber1Tree.createNode(false);
    expect(servantTree.hasChild(sibling)).toEqual(true);
    expect(sibling.value).toEqual('');
    expect(sibling.children).toEqual(null);
    expect(sibling.isLeaf()).toEqual(true);
    expect(sibling.isNew()).toEqual(true);
    expect(sibling.positionInParent).toEqual(2);
  });
  it('creates child node (branch)', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var child = servantTree.createNode(true);
    expect(servantTree.hasChild(child)).toEqual(true);
    expect(child.value).toEqual('');
    expect(child.children).toEqual([]);
    expect(child.isBranch()).toEqual(true);
    expect(child.isNew()).toEqual(true);
    expect(child.positionInParent).toEqual(2);
  });
  it('creates static tree', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      settings: { static: true },
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(servantTree.isStatic()).toEqual(true);
  });
  it('creates non-static tree by default', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(servantTree.isStatic()).toEqual(false);
    expect(servantTree.children[0].isStatic()).toEqual(false);
    expect(servantTree.children[1].isStatic()).toEqual(false);
  });
  it('creates static tree and makes all children static as well', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      settings: { static: true },
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(servantTree.isStatic()).toEqual(true);
    expect(servantTree.children[0].isStatic()).toEqual(true);
    expect(servantTree.children[1].isStatic()).toEqual(true);
  });
  it('creates static tree and makes all children static as well: children can override static option', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      settings: { static: true },
      children: [{ value: 'Servant#1', settings: { static: false } }, { value: 'Servant#2' }]
    });
    expect(servantTree.isStatic()).toEqual(true);
    expect(servantTree.children[0].isStatic()).toEqual(false);
    expect(servantTree.children[1].isStatic()).toEqual(true);
  });
  it('knows that it is branch', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(servantTree.isLeaf()).toEqual(false);
    expect(servantTree.isBranch()).toEqual(true);
  });
  it('knows that it is leaf', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master'
    });
    expect(servantTree.isLeaf()).toEqual(true);
    expect(servantTree.isBranch()).toEqual(false);
  });
  it('knows that it is root', function() {
    var servantTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(servantTree.isRoot()).toEqual(true);
    expect(servantTree.children[0].isRoot()).toEqual(false);
    expect(servantTree.children[1].isRoot()).toEqual(false);
  });
  it('knows its siblings', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var servantNumber1Tree = masterTree.children[0];
    var servantNumber2Tree = masterTree.children[1];
    expect(masterTree.hasSibling(servantNumber1Tree)).toEqual(false);
    expect(servantNumber1Tree.hasSibling(servantNumber1Tree)).toEqual(true);
    expect(servantNumber1Tree.hasSibling(servantNumber2Tree)).toEqual(true);
    expect(servantNumber2Tree.hasSibling(servantNumber1Tree)).toEqual(true);
  });
  it('knows its not leaf', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: []
    });
    expect(masterTree.isRoot()).toEqual(true);
    expect(masterTree.isLeaf()).toEqual(false);
    expect(masterTree.hasChildren()).toEqual(false);
  });
  it('knows its children', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var servantNumber1Tree = masterTree.children[0];
    var servantNumber2Tree = masterTree.children[1];
    var imposter = new tree_1.Tree({ value: 'HA-HA-HA!!!' });
    expect(masterTree.hasChild(servantNumber1Tree)).toEqual(true);
    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(true);
    expect(masterTree.hasChild(imposter)).toEqual(false);
    expect(servantNumber2Tree.hasChild(masterTree)).toEqual(false);
    expect(servantNumber1Tree.hasChild(servantNumber2Tree)).toEqual(false);
  });
  it('can remove children', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var servantNumber1Tree = masterTree.children[0];
    var servantNumber2Tree = masterTree.children[1];
    masterTree.removeChild(servantNumber2Tree);
    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(false);
    expect(masterTree.children.length).toEqual(1);
    expect(masterTree.children[0]).toBe(servantNumber1Tree);
  });
  it('cannot remove node that is not a child', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var imposter = new tree_1.Tree({ value: 'HA-HA-HA!!!' });
    masterTree.removeChild(imposter);
    expect(masterTree.children.length).toEqual(2);
    expect(masterTree.children[0].value).toEqual('Servant#1');
    expect(masterTree.children[1].value).toEqual('Servant#2');
  });
  it('can remove itself from parent', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var servantNumber1Tree = masterTree.children[0];
    var servantNumber2Tree = masterTree.children[1];
    servantNumber2Tree.removeItselfFromParent();
    expect(masterTree.hasChild(servantNumber2Tree)).toEqual(false);
    expect(masterTree.children.length).toEqual(1);
    expect(masterTree.children[0]).toBe(servantNumber1Tree);
  });
  it("should do nothing when some tries to remove a tree without a parent from parent simply cause it hasn't parent", function() {
    var masterTree = new tree_1.Tree({
      value: 'Master'
    });
    masterTree.removeItselfFromParent();
  });
  it('can swap its position in parent with sibling', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var servantNumber1Tree = masterTree.children[0];
    var servantNumber2Tree = masterTree.children[1];
    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);
    servantNumber1Tree.swapWithSibling(servantNumber2Tree);
    expect(servantNumber1Tree.positionInParent).toEqual(1);
    expect(servantNumber2Tree.positionInParent).toEqual(0);
  });
  it('cannot swap its position in parent with node that is not its sibling', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    var imposter = new tree_1.Tree({ value: 'HA-HA-HA!!!' });
    var servantNumber1Tree = masterTree.children[0];
    var servantNumber2Tree = masterTree.children[1];
    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);
    servantNumber1Tree.swapWithSibling(imposter);
    expect(servantNumber1Tree.positionInParent).toEqual(0);
    expect(servantNumber2Tree.positionInParent).toEqual(1);
  });
  it('has "Leaf" folding type if it is leaf (by default for leaves)', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master'
    });
    expect(masterTree.isLeaf()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(false);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Leaf);
  });
  it('cannot switch "Leaf" folding type', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master'
    });
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Leaf);
    masterTree.switchFoldingType();
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Leaf);
  });
  it('has "Empty" folding type if it is branch and has no children', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: []
    });
    expect(masterTree.isBranch()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(false);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Empty);
  });
  it('cannot switch "Empty" folding type', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: []
    });
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Empty);
    masterTree.switchFoldingType();
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Empty);
  });
  it('has "Expanded" folding type if it is branch and expanded (by default for branches)', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(masterTree.isBranch()).toEqual(true);
    expect(masterTree.isNodeExpanded()).toEqual(true);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Expanded);
  });
  it('can switch "Branch" folding type', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      children: [{ value: 'Servant#1' }, { value: 'Servant#2' }]
    });
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Expanded);
    expect(masterTree.isNodeExpanded()).toEqual(true);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
    masterTree.switchFoldingType();
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Collapsed);
    expect(masterTree.isNodeExpanded()).toEqual(false);
    expect(masterTree.isNodeCollapsed()).toEqual(true);
    masterTree.switchFoldingType();
    expect(masterTree.foldingType).toEqual(tree_types_1.FoldingType.Expanded);
    expect(masterTree.isNodeExpanded()).toEqual(true);
    expect(masterTree.isNodeCollapsed()).toEqual(false);
  });
  it('has undefined status by default', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master'
    });
    expect(masterTree.isNew()).toEqual(false);
    expect(masterTree.isBeingRenamed()).toEqual(false);
    expect(masterTree.isModified()).toEqual(false);
  });
  it('can be marked as new', function() {
    var masterTree = new tree_1.Tree({ value: 'Master' });
    masterTree.markAsNew();
    expect(masterTree.isNew()).toEqual(true);
  });
  it('can be marked as modified', function() {
    var masterTree = new tree_1.Tree({ value: 'Master' });
    masterTree.markAsModified();
    expect(masterTree.isModified()).toEqual(true);
  });
  it('can be marked as being renamed', function() {
    var masterTree = new tree_1.Tree({ value: 'Master' });
    masterTree.markAsBeingRenamed();
    expect(masterTree.isBeingRenamed()).toEqual(true);
  });
  it('can load its children asynchronously', function(done) {
    var tree = new tree_1.Tree({
      value: 'AsyncParent',
      loadChildren: function(callback) {
        setTimeout(function() {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 10);
      }
    });
    tree.switchFoldingType();
    tree.childrenAsync.subscribe(function(children) {
      expect(tree.children.length).toEqual(2);
      expect(tree.children[0].value).toEqual(children[0].value);
      expect(tree.children[1].value).toEqual(children[1].value);
      done();
    });
  });
  it('has right statuses while loading its children asynchronously', function(done) {
    var tree = new tree_1.Tree({
      value: 'AsyncParent',
      loadChildren: function(callback) {
        setTimeout(function() {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 200);
      }
    });
    tree.switchFoldingType();
    expect(tree.childrenWereLoaded()).toEqual(false);
    setTimeout(function() {
      expect(tree.childrenAreBeingLoaded()).toEqual(true);
    }, 110);
    tree.childrenAsync.subscribe(function(children) {
      expect(tree.children.length).toEqual(2);
      expect(tree.children[0].value).toEqual(children[0].value);
      expect(tree.children[1].value).toEqual(children[1].value);
      expect(tree.childrenWereLoaded()).toEqual(true);
      expect(tree.childrenAreBeingLoaded()).toEqual(false);
      done();
    });
  });
  it('can load its children asynchronously: loads children only once', function(done) {
    var loadCount = 0;
    var tree = new tree_1.Tree({
      value: 'AsyncParent',
      loadChildren: function(callback) {
        loadCount++;
        setTimeout(function() {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 10);
      }
    });
    tree.switchFoldingType();
    expect(tree.childrenAsync === tree.childrenAsync).toEqual(
      true,
      'observable for children loading gets created just once'
    );
    tree.childrenAsync.subscribe(function() {
      tree.childrenAsync.subscribe(function(children) {
        expect(loadCount).toEqual(1, 'children should be loaded only once');
        expect(tree.children.length).toEqual(2);
        expect(tree.children[0].value).toEqual(children[0].value);
        expect(tree.children[1].value).toEqual(children[1].value);
        done();
      });
    });
  });
  it('can load its children asynchronously: node with async children should be collapsed by defualt', function() {
    var tree = new tree_1.Tree({
      value: 'AsyncParent',
      loadChildren: function(callback) {
        setTimeout(function() {
          callback([{ value: 'Child#1' }, { value: 'Child#2' }]);
        }, 10);
      }
    });
    expect(tree.foldingType).toEqual(tree_types_1.FoldingType.Collapsed);
  });
  it('can add a custom template to the node or leaf', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      settings: {
        templates: {
          node: '<i class="folder"></i>',
          leaf: '<i class="file"></i>'
        }
      },
      children: [
        { value: 'Servant#1' },
        {
          value: 'Servant#2',
          children: [{ value: 'Servant#2.1' }]
        }
      ]
    });
    expect(masterTree.nodeTemplate).toEqual('<i class="folder"></i>');
    expect(masterTree.children[0].nodeTemplate).toEqual('<i class="file"></i>');
    expect(masterTree.children[1].nodeTemplate).toEqual('<i class="folder"></i>');
  });
  it('can add a css classes for expanded, collapsed nodes', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      settings: {
        cssClasses: {
          expanded: 'fa fa-caret-down',
          collapsed: 'fa fa-caret-right',
          leaf: 'fa'
        },
        templates: {
          node: '<i class="folder"></i>',
          leaf: '<i class="file"></i>'
        }
      },
      children: [
        { value: 'Servant#1' },
        {
          value: 'Servant#2',
          children: [{ value: 'Servant#2.1' }]
        }
      ]
    });
    expect(masterTree.isNodeExpanded()).toEqual(true, 'initially node is expanded');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-down');
    masterTree.switchFoldingType();
    expect(masterTree.isNodeExpanded()).toEqual(false, 'node is collapsed');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-right');
  });
  it('can add a css classes for empty nodes', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      settings: {
        cssClasses: {
          empty: 'fa fa-caret-left'
        }
      },
      children: []
    });
    expect(masterTree.isNodeExpanded()).toEqual(false, 'initially node is not expanded');
    expect(masterTree.isNodeCollapsed()).toEqual(false, 'initially node is not collapsed');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-left');
    masterTree.switchFoldingType();
    expect(masterTree.isNodeExpanded()).toEqual(false, 'node cannot collapsed');
    expect(masterTree.isNodeCollapsed()).toEqual(false, 'node cannot expand');
    expect(masterTree.foldingCssClass).toEqual('fa fa-caret-left');
  });
  it('can add a css classes for leaf nodes', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      settings: {
        cssClasses: {
          expanded: 'fa fa-caret-down',
          collapsed: 'fa fa-caret-right',
          leaf: 'fa'
        },
        templates: {
          node: '<i class="folder"></i>',
          leaf: '<i class="file"></i>'
        }
      }
    });
    expect(masterTree.isLeaf()).toEqual(true, 'Node without children is leaf');
    expect(masterTree.foldingCssClass).toEqual('fa');
  });
  it('can add custom template to an element which opens left menu of a node', function() {
    var masterTree = new tree_1.Tree({
      value: 'Master',
      settings: {
        templates: {
          leftMenu: '<i class="navigation"></i>'
        }
      },
      children: [
        { value: 'Servant#1' },
        {
          value: 'Servant#2',
          settings: {
            leftMenu: true
          },
          children: [{ value: 'Servant#2.1' }]
        }
      ]
    });
    expect(masterTree.leftMenuTemplate).toEqual('');
    expect(masterTree.children[0].leftMenuTemplate).toEqual('');
    expect(masterTree.children[1].leftMenuTemplate).toEqual('<i class="navigation"></i>');
  });
  it('should not load children when they are already loaded', function() {
    var model = {
      value: 'root'
    };
    var tree = new tree_1.Tree(model);
    spyOn(tree, 'childrenWereLoaded').and.returnValue(true);
    expect(tree.childrenShouldBeLoaded()).toBe(false);
  });
  it('should load children when hasChildren is true', function() {
    var model = {
      value: 'root',
      emitLoadNextLevel: true,
      id: 6
    };
    var tree = new tree_1.Tree(model);
    expect(tree.hasChildren).toBeTruthy();
    expect(tree.childrenShouldBeLoaded()).toBeTruthy();
  });
  it('should be considered as a branch if hasChildren is true', function() {
    var model = {
      value: 'root',
      emitLoadNextLevel: true,
      id: 6
    };
    var tree = new tree_1.Tree(model);
    expect(tree.isBranch()).toBeTruthy();
  });
  it('can be converted to TreeModel', function() {
    var model = {
      id: 6,
      value: 'root',
      emitLoadNextLevel: false,
      settings: {
        isCollapsedOnInit: true,
        static: false,
        leftMenu: false,
        rightMenu: true,
        checked: true,
        selectionAllowed: true,
        keepNodesInDOM: true
      },
      children: [
        {
          value: 'child#1',
          emitLoadNextLevel: false,
          settings: {
            isCollapsedOnInit: true,
            static: false,
            leftMenu: false,
            rightMenu: true,
            checked: true,
            selectionAllowed: true,
            keepNodesInDOM: true
          }
        }
      ]
    };
    var tree = new tree_1.Tree(model);
    expect(tree.toTreeModel()).toEqual(model);
  });
  it('has selection allowed by default', function() {
    var model = {
      id: 6,
      value: 'root'
    };
    var tree = new tree_1.Tree(model);
    expect(tree.selectionAllowed).toBe(true);
  });
  it('can forbid selection', function() {
    var model = {
      id: 6,
      value: 'root'
    };
    var tree = new tree_1.Tree(model);
    tree.selectionAllowed = false;
    expect(tree.selectionAllowed).toBe(false);
  });
  it('can allow selection', function() {
    var model = {
      id: 6,
      value: 'root',
      settings: {
        selectionAllowed: false
      }
    };
    var tree = new tree_1.Tree(model);
    expect(tree.selectionAllowed).toBe(false);
    tree.selectionAllowed = true;
    expect(tree.selectionAllowed).toBe(true);
  });
  it('does not cascade selectionAllowed setting', function() {
    var model = {
      id: 6,
      value: 'root',
      settings: {
        selectionAllowed: false
      },
      children: [{ value: 'foo' }]
    };
    var tree = new tree_1.Tree(model);
    expect(tree.selectionAllowed).toBe(false);
    expect(tree.children[0].selectionAllowed).toBe(true);
  });
  it('has an access to menu items', function() {
    var model = {
      id: 42,
      value: 'root',
      settings: {
        menuItems: [
          {
            action: menu_events_1.NodeMenuItemAction.Custom,
            name: 'FooMenuItem',
            cssClass: 'fooMenuItemCss'
          }
        ]
      }
    };
    var tree = new tree_1.Tree(model);
    expect(tree.hasCustomMenu()).toBe(true);
    expect(tree.menuItems).toEqual([
      {
        action: menu_events_1.NodeMenuItemAction.Custom,
        name: 'FooMenuItem',
        cssClass: 'fooMenuItemCss'
      }
    ]);
  });
  it('static nodes cannot have custom menu', function() {
    var model = {
      id: 42,
      value: 'root',
      settings: {
        static: true,
        menuItems: [
          {
            action: menu_events_1.NodeMenuItemAction.Custom,
            name: 'FooMenuItem',
            cssClass: 'fooMenuItemCss'
          }
        ]
      }
    };
    var tree = new tree_1.Tree(model);
    expect(tree.hasCustomMenu()).toBe(false);
  });
  it('does not have custom menu without menu items', function() {
    var model = {
      id: 42,
      value: 'root'
    };
    var tree = new tree_1.Tree(model);
    expect(tree.hasCustomMenu()).toBe(false);
  });
});
//# sourceMappingURL=tree.spec.js.map
