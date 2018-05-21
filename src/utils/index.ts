import * as _ from 'lodash';
import CONSTANTS from '../constants';

interface RepeatList {
  id: string;
  name: string;
  description?: string;
  isAlert?: boolean;
  count: number;
}

export function generatePickerOptions(
  min: number,
  max: number,
  refernence: string
) {
  let options: any = {};
  for (let i = min; i <= max; i++) {
    options[i] = {
      label: i + refernence
    };
  }

  return options;
}

export function generatePrescriptionLengths() {
  let options: any = {};

  for (let i = 2; i <= 21; i++) {
    options[i] = {
      label: i + ' Days'
    };
  }
  for (let i = 22; i <= 25; i++) {
    options[i] = {
      label: i - 18 + ' Weeks'
    };
  }
  options[0] = {
    label: 'longterm'
  };
  options[1] = {
    label: 'Once'
  };
  return options;
}

export default function returnReocurringItemsList(
  parentObjectList: Array<object>,
  pairingKey: string,
  showAlert: boolean = false
) {
  let repeatList: Array<RepeatList> = [];
  const itemsInParent: Array<any> = parentObjectList.map((node: any) => {
    return node.node[pairingKey].edges.map((parentItem: any) => {
      return parentItem.node;
    });
  });
  const itemsInParentFlattened = _.flatten(itemsInParent);
  const itemsInParentFlattenedUniq = _.uniqBy(itemsInParentFlattened, 'id');

  itemsInParentFlattenedUniq.map(uniqueItem => {
    const uniqueItemId = uniqueItem.id;
    const repeats = itemsInParentFlattened.filter(
      item => item.id === uniqueItemId
    );

    if (showAlert) {
      const repeatedTech = repeats[0];
      const repeatedItem = {
        id: repeatedTech.id,
        name: repeatedTech.name,
        count: repeats.length,
        isAlert: repeatedTech.isAlert
      };

      if (repeatedTech.isAlert) {
        repeatList.push(repeatedItem);
      }
    } else if (repeats.length > 1) {
      const repeatedTech = repeats[0];
      const repeatedItem = {
        id: repeatedTech.id,
        name: repeatedTech.name,
        count: repeats.length
      };
      repeatList.push(repeatedItem);
    }
  });
  return repeatList;
}

function getFlatLists(selectedItems: any, allItemsWithSelected: any) {
  const selectedItemsList = selectedItems.map((selectedItem: any) => {
    return selectedItem.node.id;
  });
  const updatedSelectedItemsList = allItemsWithSelected
    .filter((selectedItem: any) => {
      return selectedItem.node.isSelected;
    })
    .map((filteredItem: any) => filteredItem.node.id);

  return {
    selectedItemsList,
    updatedSelectedItemsList
  };
}

export async function getUpdateLists(selected: any, allItems: any) {
  const lists = getFlatLists(selected, allItems);
  const add = _.difference(
    lists.updatedSelectedItemsList,
    lists.selectedItemsList
  );
  const remove = _.difference(
    lists.selectedItemsList,
    lists.updatedSelectedItemsList
  );

  return {
    add,
    remove
  };
}

export function filterSingleSelectionList(
  selectedItem: any,
  allItems: SelectionItemNode[]
): SelectionItemNode[] {
  const allItemsWithSelected: SelectionItemNode[] = allItems.map(
    (allItem: SelectionItemNode): SelectionItemNode => {
      return {
        node: {
          id: allItem.node.id,
          name: allItem.node.name,
          category: allItem.node.category,
          isAlert: allItem.node.isAlert || false,
          isSelected: selectedItem ? selectedItem.id === allItem.node.id : false
        }
      };
    }
  );

  return _.sortBy(allItemsWithSelected, [
    function(o: any) {
      return o.node.name;
    }
  ]);
}

export function filterSelectionList(
  selectedItems: SelectionItemNode[],
  allItems: SelectionItemNode[]
): SelectionItemNode[] {
  const selectedItemsList = selectedItems.map(
    (selectedItem: SelectionItemNode): string => {
      return selectedItem.node.id;
    }
  );
  const allItemsWithSelected: SelectionItemNode[] = allItems.map(
    (allItem: SelectionItemNode): SelectionItemNode => {
      return {
        node: {
          id: allItem.node.id,
          name: allItem.node.name,
          category: allItem.node.category || null,
          isAlert: allItem.node.isAlert || false,
          isSelected: _.includes(selectedItemsList, allItem.node.id)
        }
      };
    }
  );

  return _.sortBy(allItemsWithSelected, [
    function(o: any) {
      return o.node.name;
    }
  ]);
}

export function filterSectionSelectionList(
  selectedItems: SelectionItemNode[],
  allItems: SelectionItemNode[]
) {
  const categoryOrder = [
    'Head and Neck',
    'Lungs',
    'Heart and Bloodstream',
    'Abdomen',
    'Kidneys and Urinary tract',
    'Genitals',
    'Skin',
    'Bones and Joints'
  ];
  const filteredSelectionList = filterSelectionList(selectedItems, allItems);
  const groupByCategory = _.groupBy(
    filteredSelectionList,
    (d: any) => d.node.category
  );
  const DS = _.reduce(
    groupByCategory,
    (acc: any, next: any, index: string) => {
      acc.push({
        key: index,
        data: next
      });
      return acc;
    },
    []
  );

  return _.sortBy(DS, function(obj: any) {
    return _.indexOf(categoryOrder, obj.key);
  });
}

export function updateSectionSelectionList(
  isSelected: boolean,
  itemId: string,
  allItems: any
) {
  const updatedItems = allItems.map((x: any) => {
    const updatedCat = {
      key: x.key,
      data: x.data.map((y: any) => {
        const updatedItem = {
          node: {
            id: y.node.id,
            category: y.node.category,
            name: y.node.name,
            isAlert: y.node.isAlert || false,
            isSelected: !y.node.isSelected
          }
        };
        return y.node.id === itemId ? updatedItem : y;
      })
    };
    return updatedCat;
  });

  return updatedItems;
}

export function updateSingleSelectionList(itemId: string, allItems: any) {
  return allItems.map((item: any) => {
    const updatedItem = {
      node: {
        id: item.node.id,
        name: item.node.name,
        isSelected: itemId === item.node.id
      }
    };
    return updatedItem;
  });
}

export function updateSelectionList(
  isSelected: boolean,
  itemId: string,
  allItems: SelectionItemNode[]
) {
  return allItems.map((item: any) => {
    const updatedItem = {
      node: {
        id: item.node.id,
        name: item.node.name,
        isAlert: item.node.isAlert || false,
        isSelected: !item.node.isSelected
      }
    };
    return item.node.id === itemId ? updatedItem : item;
  });
}

export function saveItemSelections(
  hasSections: boolean,
  typeId: string,
  selectedItems: any,
  allItems: any,
  removeFromConnection: any,
  addToConnection: any
) {
  if (hasSections) {
    let allItemsWithSelected: any[] = [];
    _.forEach(allItems, (item: any, index) => {
      allItemsWithSelected.push(item.data);
    });
    const allItemsFlattened = _.flatten(allItemsWithSelected);
    getUpdateLists(selectedItems, allItemsFlattened).then(lists => {
      lists.remove.map((removeId: string) => {
        removeFromConnection(removeId, typeId);
      });
      lists.add.map((addId: string) => {
        addToConnection(addId, typeId);
      });
    });
  } else {
    getUpdateLists(selectedItems, allItems).then(lists => {
      lists.remove.map((removeId: string) => {
        removeFromConnection(removeId, typeId);
      });
      lists.add.map((addId: string) => {
        addToConnection(addId, typeId);
      });
    });
  }
}

export function formatDateToISO(dateString: string) {
  const formattedDate = dateString
    .replace(/(\d+)(st|nd|rd|th)/, '$1')
    .replace(/ /g, '-');
  return new Date(formattedDate).toISOString();
}

export function queryReferenceTypeKey(queryType: string) {
  switch (queryType) {
    case CONSTANTS.REFERENCE_TYPES.INFECTIONS.NAME:
      return CONSTANTS.REFERENCE_TYPES.INFECTIONS.KEY;
    case CONSTANTS.REFERENCE_TYPES.ORGANISMS.NAME:
      return CONSTANTS.REFERENCE_TYPES.ORGANISMS.KEY;
    case CONSTANTS.REFERENCE_TYPES.SPECIMENS.NAME:
      return CONSTANTS.REFERENCE_TYPES.SPECIMENS.KEY;
    case CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.NAME:
      return CONSTANTS.REFERENCE_TYPES.ANTIBIOTICS.KEY;
    case CONSTANTS.REFERENCE_TYPES.ALLERGIES.NAME:
      return CONSTANTS.REFERENCE_TYPES.ALLERGIES.KEY;
    case CONSTANTS.REFERENCE_TYPES.SYMPTOMS.NAME:
      return CONSTANTS.REFERENCE_TYPES.SYMPTOMS.KEY;
    case CONSTANTS.REFERENCE_TYPES.PROFESSIONALS.NAME:
      return CONSTANTS.REFERENCE_TYPES.PROFESSIONALS.KEY;
    case CONSTANTS.REFERENCE_TYPES.VACCINATIONS.NAME:
      return CONSTANTS.REFERENCE_TYPES.VACCINATIONS.KEY;
  }
  return '';
}
