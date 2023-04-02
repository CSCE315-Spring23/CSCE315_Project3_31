import { Grid, GridItem } from '@chakra-ui/react';
import MenuItemCard from '../menuItemCard';

const MenuItemSelectionDisplay = ({ menuItems, onUpdate }) => {
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={2}>
            {
                menuItems.map(
                    menuItem => 
                    <GridItem>
                        <MenuItemCard 
                            info={menuItem} 
                            onUpdate={onUpdate}
                        />
                    </GridItem>
                )
            }
        </Grid>
    );
}

export default MenuItemSelectionDisplay;