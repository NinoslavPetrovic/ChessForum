using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChessForumWebApp.Migrations
{
    public partial class in1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUser_Addresses_AddressId",
                table: "AppUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Clubs_AppUser_AppUserId",
                table: "Clubs");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_AppUser_AppUserId",
                table: "Tournaments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AppUser");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Tournaments",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Clubs",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AddressId",
                table: "AppUser",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "AppUser",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUser_Addresses_AddressId",
                table: "AppUser",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Clubs_AppUser_AppUserId",
                table: "Clubs",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_AppUser_AppUserId",
                table: "Tournaments",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "AppUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppUser_Addresses_AddressId",
                table: "AppUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Clubs_AppUser_AppUserId",
                table: "Clubs");

            migrationBuilder.DropForeignKey(
                name: "FK_Tournaments_AppUser_AppUserId",
                table: "Tournaments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "AppUser");

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Tournaments",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AppUserId",
                table: "Clubs",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AddressId",
                table: "AppUser",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "AppUser",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppUser_Addresses_AddressId",
                table: "AppUser",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Clubs_AppUser_AppUserId",
                table: "Clubs",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Tournaments_AppUser_AppUserId",
                table: "Tournaments",
                column: "AppUserId",
                principalTable: "AppUser",
                principalColumn: "Id");
        }
    }
}
