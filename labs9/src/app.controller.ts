import { Body, Controller, Get, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { itemsDto } from './dto';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('/')
    @UsePipes(ValidationPipe)
    async getHello(@Body()body:itemsDto){
        try{
           return await this.appService.getItems(body)
        }
        catch(err){
            console.log(err);
            return err;
        }

    }
}
