import { Text} from '@mantine/core';
import "./Footer.css"


function Footer() {
   return (
      <footer className="footer">
            <Text className='footer_text' color="dimmed" size="sm">
               © 2023 Cynthia, Gabor, Emilie. All rights reserved.
            </Text>
      </footer>
   )
}

export default Footer