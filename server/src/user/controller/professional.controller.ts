import {
  Controller,
  Get,
  UseGuards,
  Session,
  Post,
  Body,
  Logger,
  Param,
} from '@nestjs/common';
import { ProfessionalService } from '../service/professional.service';
import { RoleGuard } from 'src/auth/auth.guard';
import { RequiresRoles } from 'src/auth/roles.decorator';
import { ISession } from 'src/auth/session.interface';
import { ResponseSuccess, ResponseError } from 'src/server-response.dto';
import { DtoProfessionalDetails } from '../dto/profession-details.dto';
import { ReviewService } from 'src/assistance-callout/service/review.service';

@Controller('professional')
export class ProfessionalController {
  constructor(
    private readonly professionalService: ProfessionalService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get('details')
  @UseGuards(RoleGuard)
  @RequiresRoles('professional')
  async getProfessional(@Session() session: ISession) {
    const result = await this.professionalService.getProfessionalById(
      session.user.userId,
    );
    return result
      ? new ResponseSuccess({
          ...result,
          userType: 'professional',
          email: session.user.email,
        })
      : new ResponseError('Could not get user details');
  }

  @Post('details')
  @UseGuards(RoleGuard)
  @RequiresRoles('professional')
  async setProfessionalDetails(
    @Body() details: DtoProfessionalDetails,
    @Session() session: ISession,
  ) {
    const userId = session.user.userId;
    Logger.log(details);
    const result = await this.professionalService.setProfessionalDetails(
      userId,
      details,
    );

    return result
      ? new ResponseSuccess(result)
      : new ResponseError('Could not update user details');
  }

  @Get('info/:id')
  async getProfessionalInfo(@Param('id') professionalId) {
    const [info, reviews] = await Promise.all([
      this.professionalService.getProfessionalById(professionalId),
      this.reviewService.getAllReviewsOf(professionalId),
    ]);

    const { phone, address, firstName, lastName } = info;

    return new ResponseSuccess({
      firstName,
      lastName,
      phone,
      address,
      reviews,
    });
  }
}
