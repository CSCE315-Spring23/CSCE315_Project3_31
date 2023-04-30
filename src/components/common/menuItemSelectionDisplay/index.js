import { Grid, GridItem } from '@chakra-ui/react';
import MenuItemCard from '../menuItemCard';

const MenuItemSelectionDisplay = ({ menuItems, readOnly, menuOnly, category, order, onUpdate }) => {
    return (
        <>
            {
                menuOnly ?
                <Grid templateColumns='repeat(6, 1fr)' gap={1}>
                    {
                        menuItems?.length ? menuItems.map(
                            menuItem =>
                            <GridItem>
                                <MenuItemCard 
                                    info={menuItem} 
                                    readOnly={readOnly}
                                    subtract={
                                        order.some(
                                            item => item.name === menuItem.name
                                            && item.quantity > 0
                                        )
                                    }
                                    onUpdate={onUpdate}
                                />
                            </GridItem>
                        ) : ""
                    }
                </Grid> :
                <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                    {
                        menuItems?.length ? menuItems.map(
                            menuItem =>
                            menuItem.type === category ?
                                <GridItem>
                                    <MenuItemCard 
                                        info={menuItem} 
                                        readOnly={readOnly}
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
            }
        </>
    );
}

export default MenuItemSelectionDisplay;