interface SelectionItemNode {
  node: SelectionItem;
}

interface SelectionItem {
  id: string;
  name: string;
  category: string | null;
  isSelected: boolean;
  isAlert?: boolean;
}
