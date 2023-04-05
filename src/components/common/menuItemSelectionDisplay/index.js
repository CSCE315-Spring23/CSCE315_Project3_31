import { Grid, GridItem } from '@chakra-ui/react';
import MenuItemCard from '../menuItemCard';

const MenuItemSelectionDisplay = ({ menuItems, category, order, onUpdate }) => {
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={2}>
            {
                menuItems?.length ? menuItems.map(
                    menuItem =>
                    menuItem.type === category ?
                        <GridItem>
                            <MenuItemCard 
                                info={menuItem} 
                                subtract={
                                    order.some(
                                        item => item.name === menuItem.name
                                        && item.quantity > 0
                                    )
                                }
                                onUpdate={onUpdate}
                            />
                        </GridItem>
                        : ""
                ) : ""
            }
        </Grid>
    );
}

export default MenuItemSelectionDisplay;