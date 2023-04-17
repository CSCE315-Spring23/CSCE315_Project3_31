import { Grid, GridItem } from '@chakra-ui/react';
import MenuItemCard from '../menuItemCard';
import InventoryItemCard from '../inventoryItemCard';

const ItemSelectionDisplay = ({ isMenu, items, category, onUpdate }) => {
    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={2}>
            {
                items?.length ? (
                    isMenu ?
                        items.map(
                            menuItem =>
                            menuItem.type === category ?
                                <GridItem>
                                    <MenuItemCard 
                                        info={menuItem}
                                        onUpdate={onUpdate}
                                    />
                                </GridItem>
                                : ""
                        ) : items.map(
                            inventoryItem =>
                            <GridItem>
                                <InventoryItemCard 
                                    info={inventoryItem}
                                    onUpdate={onUpdate}
                                />
                            </GridItem>
                        )
                ) : ""
            }
        </Grid>
    );
}

export default ItemSelectionDisplay;